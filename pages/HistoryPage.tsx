import React from 'react';
import { useVault } from '../context/VaultContext';
import { ArrowRight, ArrowLeft } from '../components/ui/Icons';

export const HistoryPage = () => {
    const { user } = useVault();

    if (!user) return null;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-1">Transaction History</h2>
                <p className="text-gray-400 font-mono text-sm">On-Chain Activity Log</p>
            </div>

            <div className="bg-defi-800 border border-defi-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black border-b border-defi-700 text-gray-500 font-mono text-xs uppercase tracking-wider">
                            <th className="p-4">Type</th>
                            <th className="p-4">Hash</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Time</th>
                            <th className="p-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-defi-700">
                        {user.history.map(tx => (
                            <tr key={tx.id} className="hover:bg-defi-900/50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        {tx.type === 'DEPOSIT' ? (
                                            <div className="p-1.5 bg-green-900/30 text-green-500 rounded-full">
                                                <ArrowLeft className="w-3 h-3 rotate-45" />
                                            </div>
                                        ) : (
                                            <div className="p-1.5 bg-red-900/30 text-red-500 rounded-full">
                                                <ArrowRight className="w-3 h-3 -rotate-45" />
                                            </div>
                                        )}
                                        <span className="font-bold text-white text-sm">{tx.type}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <a href="#" className="text-defi-accent hover:underline font-mono text-sm">{tx.hash}</a>
                                </td>
                                <td className="p-4 font-mono text-white">
                                    {tx.amount.toLocaleString()} USDC
                                </td>
                                <td className="p-4 text-gray-400 text-sm">
                                    {new Date(tx.timestamp).toLocaleDateString()}
                                </td>
                                <td className="p-4 text-right">
                                    <span className="px-2 py-1 bg-green-900/20 text-green-500 text-[10px] font-bold uppercase tracking-wider border border-green-900">
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {user.history.length === 0 && (
                    <div className="p-8 text-center text-gray-500 font-mono">
                        NO TRANSACTIONS FOUND
                    </div>
                )}
            </div>
        </div>
    );
};
