import React from 'react';
import { useVault } from '../context/VaultContext';
import { StatsCard } from '../components/StatsCard';
import { EarningsChart } from '../components/EarningsChart';
import { Lock, TrendingUp, Wallet, Clock } from '../components/ui/Icons';

import { Faucet } from '../components/Faucet';

export const DashboardHome = () => {
    const { stats, user } = useVault();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white uppercase tracking-tight">Dashboard Overview</h1>
                <Faucet />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Value Locked"
                    value={`$${stats.tvl.toLocaleString()}`}
                    change="+5.2%"
                    icon={Lock}
                />
                <StatsCard
                    title="Current APY"
                    value={`${stats.apy}%`}
                    change="+0.5%"
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Your Balance"
                    value={user?.balance ? `$${user.balance.toLocaleString()}` : '$0.00'}
                    icon={Wallet}
                />
                <StatsCard
                    title="Next Unlock"
                    value={user?.deposits && user.deposits.length > 0 ? `${Math.ceil((user.deposits[0].unlockDate - Date.now()) / (1000 * 60 * 60 * 24))} Days` : 'N/A'}
                    icon={Clock}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <EarningsChart
                        principal={user?.deposits && user.deposits.length > 0 ? user.deposits[0].amount : 10000}
                        apy={stats.apy}
                        days={user?.deposits && user.deposits.length > 0 ? Math.ceil((user.deposits[0].unlockDate - Date.now()) / (1000 * 60 * 60 * 24)) : 365}
                    />
                </div>

                {/* Quick Actions / Mini-Feed could go here */}
                <div className="border border-defi-800 bg-black p-4">
                    <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3 text-sm">
                                <div className="w-2 h-2 bg-defi-accent rounded-full"></div>
                                <span className="text-gray-500 font-mono">0x...{1000 + i}</span>
                                <span className="text-white ml-auto">Staked 5,000 USDC</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
