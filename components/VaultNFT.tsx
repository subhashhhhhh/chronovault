import React from 'react';
import { motion } from 'framer-motion';

interface VaultNFTProps {
    amount: number;
    unlockDate: number;
    tokenId: string;
}

export const VaultNFT: React.FC<VaultNFTProps> = ({ amount, unlockDate, tokenId }) => {
    const dateStr = new Date(unlockDate).toLocaleDateString();

    return (
        <div className="relative w-full aspect-[3/4] max-w-sm mx-auto perspective-1000 group">
            <motion.div
                whileHover={{ rotateY: 10, rotateX: -5 }}
                className="w-full h-full bg-black border-2 border-defi-accent relative overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.2)]"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(circle at 50% 50%, #dc2626 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full justify-between font-mono">
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-defi-800 pb-4">
                        <div>
                            <h3 className="text-defi-accent font-bold text-xl tracking-tighter">CHRONOVAULT</h3>
                            <p className="text-xs text-gray-500">TIME CAPSULE SERIES</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500">ID</p>
                            <p className="text-white text-sm">#{tokenId}</p>
                        </div>
                    </div>

                    {/* Central Visual */}
                    <div className="flex-1 flex items-center justify-center py-8">
                        <div className="w-32 h-32 border border-defi-accent rounded-full flex items-center justify-center relative animate-spin-slow">
                            <div className="absolute inset-2 border border-dashed border-gray-600 rounded-full" />
                            <div className="w-16 h-16 bg-defi-accent/20 rounded-full blur-md" />
                            <div className="absolute text-2xl">🔒</div>
                        </div>
                    </div>

                    {/* Data */}
                    <div className="space-y-4 border-t border-defi-800 pt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-xs">LOCKED AMOUNT</span>
                            <span className="text-white font-bold">{amount.toLocaleString()} USDC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-xs">UNLOCK DATE</span>
                            <span className="text-white font-bold">{dateStr}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 text-xs">STATUS</span>
                            <span className="text-defi-accent font-bold animate-pulse">SECURED</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-[10px] text-gray-600 text-center uppercase tracking-widest">
                        Immutable • Non-Fungible • Timelocked
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
