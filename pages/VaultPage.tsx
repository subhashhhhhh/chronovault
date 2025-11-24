import React, { useState } from 'react';
import { useVault } from '../context/VaultContext';
import { DepositWithdraw } from '../components/DepositWithdraw';
import { VaultNFT } from '../components/VaultNFT';
import { AlertTriangle, Lock, Unlock } from '../components/ui/Icons';

export const VaultPage = () => {
    const { user, stats, refreshData } = useVault();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Action Area */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-black border border-defi-800 p-6">
                    <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-tight flex items-center gap-2">
                        <Lock className="w-5 h-5 text-defi-accent" />
                        Vault Operations
                    </h2>
                    {user && stats ? (
                        <DepositWithdraw
                            user={user}
                            stats={stats}
                            onUpdate={refreshData}
                        />
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            Please connect your wallet to access vault operations.
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar / NFT View */}
            <div className="space-y-6">
                {user?.deposit ? (
                    <div className="bg-black border border-defi-800 p-6">
                        <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">Your Time Capsule</h3>
                        <VaultNFT
                            amount={user.deposit.amount}
                            unlockDate={user.deposit.unlockDate}
                            tokenId="8821" // Mock Token ID
                        />
                        <div className="mt-4 text-center">
                            <button className="text-xs text-defi-accent hover:text-white underline font-mono">
                                View on OpenSea ↗
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-defi-900/20 border border-dashed border-defi-800 p-8 text-center">
                        <div className="w-16 h-16 bg-defi-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-white font-bold mb-2">No Active Vault</h3>
                        <p className="text-gray-500 text-sm">Deposit assets to mint your unique Time Capsule NFT.</p>
                    </div>
                )}

                {/* Vault Stats */}
                <div className="bg-black border border-defi-800 p-6">
                    <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">Vault Metrics</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Base APY</span>
                            <span className="text-white font-mono">{stats.apy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total Staked</span>
                            <span className="text-white font-mono">${stats.tvl.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Lock Duration</span>
                            <span className="text-white font-mono">365 Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
