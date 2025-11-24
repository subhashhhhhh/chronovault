import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { useVault } from '../context/VaultContext';
import { LayoutDashboard, Vault, Settings, ShieldAlert, Zap, Activity, History } from '../components/ui/Icons';

export const DashboardLayout = () => {
    const { user, connectWallet } = useVault();

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-defi-accent selection:text-white flex flex-col">
            <Navbar
                isConnected={!!user}
                address={user?.address}
                onConnect={connectWallet}
            />

            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-64 hidden lg:block shrink-0">
                    <nav className="space-y-2 sticky top-24">
                        <NavLink
                            to="/dashboard"
                            end
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">Overview</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/vault"
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <Vault className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">Vault Operations</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/staking"
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <Zap className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">Yield Farms</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/governance"
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <Activity className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">Governance</span>
                        </NavLink>

                        <NavLink
                            to="/dashboard/history"
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <History className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">History</span>
                        </NavLink>

                        {user?.isAdmin && (
                            <NavLink
                                to="/dashboard/admin"
                                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                            >
                                <ShieldAlert className="w-5 h-5" />
                                <span className="font-bold tracking-wide uppercase text-sm">Admin Console</span>
                            </NavLink>
                        )}

                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent transition-all ${isActive ? 'bg-defi-800 border-defi-700 text-white' : 'text-gray-400 hover:text-white hover:bg-defi-900'}`}
                        >
                            <Settings className="w-5 h-5" />
                            <span className="font-bold tracking-wide uppercase text-sm">Settings</span>
                        </NavLink>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
