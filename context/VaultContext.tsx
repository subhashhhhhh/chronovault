import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance } from 'wagmi';
import { formatUnits, parseUnits } from 'viem';
import { UserAccount, VaultStats, Deposit } from '../types';
import { CHRONO_VAULT_ADDRESS, CHRONO_VAULT_ABI, MOCK_TOKEN_ADDRESS, MOCK_TOKEN_ABI } from '../config/contracts';

interface VaultContextType {
    user: UserAccount | null;
    stats: VaultStats | null;
    loading: boolean;
    approve: (amount: number) => Promise<void>;
    deposit: (amount: number) => Promise<void>;
    withdraw: (index: number) => Promise<void>;
    boostDeposit: (days: number) => Promise<void>;
    refreshData: () => Promise<void>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider = ({ children }: { children: React.ReactNode }) => {
    const { address, isConnected } = useAccount();
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(false);

    const { writeContractAsync } = useWriteContract();

    // Read Vault Stats
    const { data: tvlData, refetch: refetchTVL } = useReadContract({
        address: CHRONO_VAULT_ADDRESS as `0x${string}`,
        abi: CHRONO_VAULT_ABI,
        functionName: 'totalValueLocked',
    });

    // Read User Deposits
    const { data: userDepositsData, refetch: refetchDeposits } = useReadContract({
        address: CHRONO_VAULT_ADDRESS as `0x${string}`,
        abi: CHRONO_VAULT_ABI,
        functionName: 'getUserDeposits',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Read User Token Balance
    const { data: balanceData, refetch: refetchBalance } = useReadContract({
        address: MOCK_TOKEN_ADDRESS as `0x${string}`,
        abi: MOCK_TOKEN_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    // Read Allowance
    const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
        address: MOCK_TOKEN_ADDRESS as `0x${string}`,
        abi: MOCK_TOKEN_ABI,
        functionName: 'allowance',
        args: address ? [address, CHRONO_VAULT_ADDRESS as `0x${string}`] : undefined,
        query: {
            enabled: !!address,
        }
    });

    const stats: VaultStats = {
        tvl: tvlData ? Number(formatUnits(tvlData as bigint, 18)) : 0,
        apr: 12.5, // Hardcoded for now
        lockPeriodDays: 365,
        penaltyRate: 0.15,
        isPaused: false
    };

    useEffect(() => {
        if (isConnected && address) {
            const deposits: Deposit[] = userDepositsData ? (userDepositsData as any[]).map((d: any, index: number) => ({
                id: index.toString(),
                amount: Number(formatUnits(d.amount, 18)),
                timestamp: 0, // Contract doesn't store deposit time, only unlock time
                unlockDate: Number(d.unlockTime) * 1000,
                accruedInterest: 0 // Not implemented in simple contract
            })) : [];

            setUser({
                address: address,
                balance: balanceData ? Number(formatUnits(balanceData as bigint, 18)) : 0,
                allowance: allowanceData ? Number(formatUnits(allowanceData as bigint, 18)) : 0,
                deposits: deposits,
                history: [],
                isAdmin: false
            });
        } else {
            setUser(null);
        }
    }, [address, isConnected, userDepositsData, balanceData, allowanceData]);

    const refreshData = async () => {
        await Promise.all([refetchTVL(), refetchDeposits(), refetchBalance(), refetchAllowance()]);
    };

    const approve = async (amount: number) => {
        if (!address) return;
        setLoading(true);
        try {
            const amountBigInt = parseUnits(amount.toString(), 18);
            await writeContractAsync({
                address: MOCK_TOKEN_ADDRESS as `0x${string}`,
                abi: MOCK_TOKEN_ABI,
                functionName: 'approve',
                args: [CHRONO_VAULT_ADDRESS as `0x${string}`, amountBigInt]
            });
            await refreshData();
        } catch (error) {
            console.error("Approve failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deposit = async (amount: number) => {
        if (!address) return;
        setLoading(true);
        try {
            const amountBigInt = parseUnits(amount.toString(), 18);
            await writeContractAsync({
                address: CHRONO_VAULT_ADDRESS as `0x${string}`,
                abi: CHRONO_VAULT_ABI,
                functionName: 'deposit',
                args: [amountBigInt, BigInt(365)] // Hardcoded 365 days for now
            });

            await refreshData();
        } catch (error) {
            console.error("Deposit failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const withdraw = async (index: number) => {
        if (!address) return;
        setLoading(true);
        try {
            await writeContractAsync({
                address: CHRONO_VAULT_ADDRESS as `0x${string}`,
                abi: CHRONO_VAULT_ABI,
                functionName: 'withdraw',
                args: [BigInt(index)]
            });
            await refreshData();
        } catch (error) {
            console.error("Withdraw failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const boostDeposit = async (days: number) => {
        // Not implemented in contract yet
        console.log("Boost not implemented on chain yet");
    };

    return (
        <VaultContext.Provider value={{ user, stats, loading, approve, deposit, withdraw, boostDeposit, refreshData }}>
            {children}
        </VaultContext.Provider>
    );
};

export const useVault = () => {
    const context = useContext(VaultContext);
    if (context === undefined) {
        throw new Error('useVault must be used within a VaultProvider');
    }
    return context;
};
