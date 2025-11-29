import React, { useState } from 'react';
import { useWriteContract, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { parseUnits } from 'viem';
import { MOCK_TOKEN_ADDRESS, MOCK_TOKEN_ABI } from '../config/contracts';
import { Droplets, CheckCircle, AlertCircle } from './ui/Icons';
import { useVault } from '../context/VaultContext';

export const Faucet = () => {
    const [status, setStatus] = useState<'idle' | 'minting' | 'success' | 'error'>('idle');
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { refreshData } = useVault();

    const handleMint = async () => {
        setStatus('minting');
        try {
            await writeContractAsync({
                address: MOCK_TOKEN_ADDRESS,
                abi: MOCK_TOKEN_ABI,
                functionName: 'mint',
                args: [parseUnits('1000', 18)],
                account: address,
                chain: sepolia
            });

            // Wait a bit for the transaction to be indexed before refreshing
            setTimeout(async () => {
                await refreshData();
                setStatus('success');
                setTimeout(() => setStatus('idle'), 3000);
            }, 2000);

        } catch (error) {
            console.error("Mint failed:", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <button
            onClick={handleMint}
            disabled={status === 'minting'}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold uppercase tracking-wider transition-colors 
                ${status === 'error' ? 'bg-red-900/20 border-red-500 text-red-500 hover:bg-red-900/30' :
                    status === 'success' ? 'bg-green-900/20 border-green-500 text-green-500 hover:bg-green-900/30' :
                        'bg-defi-800 hover:bg-defi-700 border-defi-700 text-defi-accent'}`}
        >
            {status === 'minting' && <Droplets className="h-4 w-4 animate-bounce" />}
            {status === 'success' && <CheckCircle className="h-4 w-4" />}
            {status === 'error' && <AlertCircle className="h-4 w-4" />}
            {status === 'idle' && <Droplets className="h-4 w-4" />}

            {status === 'minting' ? 'Minting...' :
                status === 'success' ? 'Sent!' :
                    status === 'error' ? 'Failed' :
                        'Faucet: 1000 USDC'}
        </button>
    );
};
