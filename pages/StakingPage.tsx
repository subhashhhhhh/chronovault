import React, { useEffect, useState } from 'react';
import { MockChainService } from '../services/mockChain';
import { StakingPool } from '../types';
import { Zap, TrendingUp } from '../components/ui/Icons';

export const StakingPage = () => {
    const [pools, setPools] = useState<StakingPool[]>([]);

    useEffect(() => {
        MockChainService.getStakingPools().then(setPools);
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-1">Yield Farms</h2>
                <p className="text-gray-400 font-mono text-sm">Provide Liquidity & Earn Rewards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pools.map(pool => (
                    <div key={pool.id} className="bg-defi-800 border border-defi-700 p-6 flex flex-col justify-between group hover:border-defi-accent transition-colors">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 bg-black border border-defi-700 rounded-full">
                                    <Zap className="w-6 h-6 text-defi-accent" />
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 font-mono uppercase">APY</p>
                                    <p className="text-2xl font-bold text-green-500">{pool.apy}%</p>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{pool.name}</h3>
                            <p className="text-gray-400 text-sm mb-6">Total Staked: ${pool.totalStaked.toLocaleString()}</p>

                            <div className="bg-black p-4 border border-defi-700 mb-6">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Your Stake</span>
                                    <span className="text-white font-mono">${pool.userStaked}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Pending Rewards</span>
                                    <span className="text-defi-accent font-mono">0.00 CHRONO</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="py-2 bg-defi-accent text-white font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors">
                                Stake
                            </button>
                            <button className="py-2 border border-defi-700 text-gray-300 font-bold uppercase text-sm hover:border-white hover:text-white transition-colors">
                                Unstake
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
