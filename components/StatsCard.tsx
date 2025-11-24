import React from 'react';

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    icon: React.ElementType;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon }) => (
    <div className="bg-black border border-defi-800 p-6 relative group overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon className="w-16 h-16 text-defi-accent" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-defi-accent" />
                <h3 className="text-gray-400 font-mono text-xs uppercase tracking-wider">{title}</h3>
            </div>
            <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
                {change && (
                    <span className="text-green-500 text-xs font-mono mb-1">{change}</span>
                )}
            </div>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 border border-defi-accent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
);
