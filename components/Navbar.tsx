import React from 'react';
import { Wallet, Shield } from './ui/Icons';

interface NavbarProps {
  isConnected: boolean;
  address?: string;
  onConnect: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  address,
  onConnect
}) => {
  const formatAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <nav className="w-full bg-defi-900 border-b border-defi-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-defi-accent p-2 rounded-sm">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight uppercase">
              ChronoVault<span className="text-defi-accent">.</span>
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onConnect}
              className={`flex items-center gap-2 px-5 py-2 rounded-sm font-bold text-sm uppercase tracking-wide border transition-all duration-200 ${isConnected
                  ? 'bg-black text-white border-defi-700'
                  : 'bg-defi-accent hover:bg-white hover:text-black hover:border-white border-defi-accent text-white'
                }`}
            >
              <Wallet className="h-4 w-4" />
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};