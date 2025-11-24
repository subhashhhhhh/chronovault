import React from 'react';
import { AdminPanel } from '../components/AdminPanel';
import { useVault } from '../context/VaultContext';

export const AdminPage = () => {
    const { stats, refreshData } = useVault();

    if (!stats) return null;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter mb-1">Admin Console</h2>
                <p className="text-gray-400 font-mono text-sm">Protocol Configuration & Management</p>
            </div>
            <AdminPanel stats={stats} onUpdate={refreshData} />
        </div>
    );
};
