import React, { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { MOCK_TOKEN_ADDRESS, MOCK_TOKEN_ABI } from '../config/contracts';
import { Droplets, CheckCircle, AlertCircle } from './ui/Icons';

export const Faucet = () => {
    const [isMinting, setIsMinting] = useState(false);
    const { writeContractAsync } = useWriteContract();

    const handleMint = async () => {
        setIsMinting(true);
        try {
            await writeContractAsync({
                address: MOCK_TOKEN_ADDRESS,
                abi: MOCK_TOKEN_ABI,
                functionName: 'mint',
                args: [parseUnits('1000', 18)]
            });
            // We could wait for receipt here, but for UI responsiveness we just show success state briefly
            setTimeout(() => setIsMinting(false), 2000);
        } catch (error) {
            console.error("Mint failed:", error);
            setIsMinting(false);
        }
    };

    return (
        <button
            onClick={handleMint}
            disabled={isMinting}
            className="flex items-center gap-2 px-4 py-2 bg-defi-800 hover:bg-defi-700 border border-defi-700 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors text-defi-accent"
        >
            <Droplets className={`h-4 w-4 ${isMinting ? 'animate-bounce' : ''}`} />
            {isMinting ? 'Minting...' : 'Faucet: 1000 USDC'}
        </button>
    );
};
