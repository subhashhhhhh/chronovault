import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
    principal: number;
    apy: number;
    days: number;
}

export const EarningsChart: React.FC<EarningsChartProps> = ({ principal, apy, days }) => {
    // Generate data points
    const data = [];
    const monthlyRate = apy / 100 / 12;
    const totalMonths = Math.ceil(days / 30);

    for (let i = 0; i <= totalMonths; i++) {
        const balance = principal * Math.pow(1 + monthlyRate, i);
        data.push({
            month: `M${i}`,
            balance: Math.round(balance),
            principal: principal
        });
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-black border border-defi-accent p-3 font-mono text-xs">
                    <p className="text-gray-400 mb-1">{label}</p>
                    <p className="text-defi-accent font-bold">
                        VAL: ${payload[0].value.toLocaleString()}
                    </p>
                    <p className="text-gray-500">
                        BASE: ${payload[1].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full h-[300px] bg-black border border-defi-800 p-4 relative overflow-hidden group">
            {/* Cyber Decoration */}
            <div className="absolute top-0 right-0 p-2 flex gap-1">
                <div className="w-1 h-1 bg-defi-accent"></div>
                <div className="w-1 h-1 bg-defi-accent opacity-50"></div>
                <div className="w-1 h-1 bg-defi-accent opacity-25"></div>
            </div>

            <h3 className="text-sm font-mono text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-defi-accent rounded-full animate-pulse"></span>
                Projected Yield Curve
            </h3>

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="month"
                        stroke="#666"
                        tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        tick={{ fill: '#666', fontSize: 10, fontFamily: 'monospace' }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#dc2626"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorBalance)"
                    />
                    <Area
                        type="step"
                        dataKey="principal"
                        stroke="#333"
                        strokeDasharray="5 5"
                        fill="none"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
