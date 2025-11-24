import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserAccount, VaultStats } from '../types';
import { MockChainService } from '../services/mockChain';

interface VaultContextType {
    user: UserAccount | null;
    stats: VaultStats | null;
    loading: boolean;
    connectWallet: () => Promise<void>;
    deposit: (amount: number) => Promise<void>;
    withdraw: (isEarly: boolean) => Promise<void>;
    boostDeposit: (days: number) => Promise<void>;
    refreshData: () => Promise<void>;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [stats, setStats] = useState<VaultStats>({
        tvl: 12500000,
        apy: 12.5,
        lockPeriodDays: 365,
        penaltyRate: 0.15,
        isPaused: false
    });
    const [loading, setLoading] = useState(false);

    const connectWallet = async () => {
        setLoading(true);
        try {
            const data = await MockChainService.connectWallet();
            setUser(data);
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        } finally {
            setLoading(false);
        }
    };

    const deposit = async (amount: number) => {
        if (!user) return;
        setLoading(true);
        try {
            const receipt = await MockChainService.deposit(user.address, amount);
            await refreshData();
        } catch (error) {
            console.error("Deposit failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const withdraw = async (isEarly: boolean) => {
        if (!user) return;
        setLoading(true);
        try {
            await MockChainService.withdraw(user.address, isEarly);
            await refreshData();
        } catch (error) {
            console.error("Withdraw failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const boostDeposit = async (days: number) => {
        if (!user) return;
        setLoading(true);
        try {
            // Simulate boost delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, this would call a contract function like `extendLock(days)`
            // For mock, we just update the local state to reflect the new unlock date
            if (user.deposit) {
                const newUnlockDate = user.deposit.unlockDate + (days * 24 * 60 * 60 * 1000);
                setUser({
                    ...user,
                    deposit: {
                        ...user.deposit,
                        unlockDate: newUnlockDate
                    }
                });
            }
        } catch (error) {
            console.error("Boost failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const refreshData = async () => {
        if (user) {
            const updatedUser = await MockChainService.getUserData(user.address);
            setUser(updatedUser);
        }
        const updatedStats = await MockChainService.getVaultStats();
        setStats(updatedStats);
    };

    const disconnectWallet = () => {
        setUser(null);
    };

    return (
        <VaultContext.Provider value={{ user, stats, loading, connectWallet, deposit, withdraw, boostDeposit, refreshData, disconnectWallet }}>
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
