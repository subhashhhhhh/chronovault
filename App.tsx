import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { VaultProvider, useVault } from './context/VaultContext';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardHome } from './pages/DashboardHome';
import { VaultPage } from './pages/VaultPage';
import { StakingPage } from './pages/StakingPage';
import { GovernancePage } from './pages/GovernancePage';
import { HistoryPage } from './pages/HistoryPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useVault();

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="h-16 w-16 bg-defi-accent animate-pulse"></div>
    </div>
  );

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};

function App() {
  return (
    <VaultProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            <Route path="vault" element={<VaultPage />} />
            <Route path="staking" element={<StakingPage />} />
            <Route path="governance" element={<GovernancePage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </VaultProvider>
  );
}

export default App;