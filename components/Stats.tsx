import React from 'react';
import { TrendingUp, Lock, DollarSign, Activity } from './ui/Icons';
import { VaultStats, UserAccount } from '../types';

interface StatsProps {
  stats: VaultStats;
  user: UserAccount | null;
}

export const Stats: React.FC<StatsProps> = ({ stats, user }) => {
  const totalDeposited = user 
    ? user.deposits.reduce((acc, curr) => acc + curr.amount, 0) 
    : 0;

  const totalEarnings = user
    ? user.deposits.reduce((acc, curr) => acc + curr.accruedInterest, 0)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* TVL Card */}
      <div className="bg-defi-800 p-6 border border-defi-700 group hover:border-defi-accent transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Value Locked</p>
          <div className="text-defi-600 group-hover:text-defi-accent transition-colors">
            <Lock className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white font-mono">${stats.tvl.toLocaleString()}</h3>
        <div className="h-1 w-8 bg-defi-700 mt-4 group-hover:w-full group-hover:bg-defi-accent transition-all duration-500"></div>
      </div>

      {/* APY Card */}
      <div className="bg-defi-800 p-6 border border-defi-700 group hover:border-defi-accent transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Current APY</p>
          <div className="text-defi-600 group-hover:text-defi-accent transition-colors">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white font-mono">{stats.apr}%</h3>
        <p className="text-xs text-defi-accent mt-1 flex items-center gap-1 font-mono uppercase">
          <Activity className="h-3 w-3" />
          Live Rate
        </p>
      </div>

      {/* User Deposits */}
      <div className="bg-defi-800 p-6 border border-defi-700 group hover:border-defi-accent transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">My Deposits</p>
          <div className="text-defi-600 group-hover:text-defi-accent transition-colors">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white font-mono">${totalDeposited.toLocaleString()}</h3>
        <p className="text-xs text-gray-500 mt-1 font-mono">{user?.deposits.length || 0} ACTIVE POSITIONS</p>
      </div>

      {/* User Earnings */}
      <div className="bg-defi-800 p-6 border border-defi-700 group hover:border-defi-accent transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Accrued Interest</p>
          <div className="text-defi-600 group-hover:text-defi-accent transition-colors">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-defi-accent font-mono">+${totalEarnings.toFixed(2)}</h3>
        <p className="text-xs text-gray-500 mt-1 font-mono">UNCLAIMED YIELD</p>
      </div>
    </div>
  );
};