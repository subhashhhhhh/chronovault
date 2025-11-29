import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Zap, Brain, Database, UserCheck, ArrowRight, ChevronRight } from '../components/ui/Icons';
import { useVault } from '../context/VaultContext';
import { CyberHero } from '../components/CyberHero';

const FeatureCard = ({ icon: Icon, title, description, isFuture = false }: any) => (
    <motion.div
        whileHover={{ scale: 1.02, backgroundColor: '#1a1a1a' }}
        className={`p-6 border ${isFuture ? 'border-dashed border-gray-700' : 'border-defi-700'} bg-black relative overflow-hidden group`}
    >
        {isFuture && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-defi-900 text-defi-accent text-[10px] font-mono uppercase tracking-wider border border-defi-accent">
                Coming Soon
            </div>
        )}
        <div className="mb-4 text-defi-accent group-hover:text-white transition-colors">
            <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm font-mono leading-relaxed">{description}</p>
    </motion.div>
);

import { ConnectButton } from '@rainbow-me/rainbowkit';

export const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useVault();

    const handleEnter = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-defi-accent selection:text-white overflow-x-hidden">
            {/* Grid Background */}
            <div className="fixed inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Navigation */}
            <nav className="relative z-50 border-b border-defi-800 bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-defi-accent p-2 rounded-sm">
                            <Shield className="h-6 w-6 text-black" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight uppercase">
                            ChronoVault<span className="text-defi-accent">.</span>
                        </span>
                    </div>
                    <ConnectButton.Custom>
                        {({
                            account,
                            chain,
                            openAccountModal,
                            openChainModal,
                            openConnectModal,
                            authenticationStatus,
                            mounted,
                        }) => {
                            const ready = mounted && authenticationStatus !== 'loading';
                            const connected =
                                ready &&
                                account &&
                                chain &&
                                (!authenticationStatus ||
                                    authenticationStatus === 'authenticated');

                            return (
                                <div
                                    {...(!ready && {
                                        'aria-hidden': true,
                                        'style': {
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        },
                                    })}
                                >
                                    {(() => {
                                        if (!connected) {
                                            return (
                                                <button onClick={openConnectModal} className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all font-mono text-sm uppercase tracking-wider">
                                                    Connect Wallet
                                                </button>
                                            );
                                        }
                                        return (
                                            <button onClick={() => navigate('/dashboard')} className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all font-mono text-sm uppercase tracking-wider">
                                                Enter Dashboard
                                            </button>
                                        );
                                    })()}
                                </div>
                            );
                        }}
                    </ConnectButton.Custom>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                            TIME IS <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-defi-accent to-white">MONEY.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-mono max-w-2xl mb-12 border-l-2 border-defi-accent pl-6">
                            The world's best blockchain-based time-locked savings protocol.
                            Lock your assets. Earn yield. Eliminate paper hands.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleEnter}
                                className="group relative px-8 py-4 bg-defi-accent text-white font-bold text-lg uppercase tracking-widest overflow-hidden whitespace-nowrap"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    LAUNCH APP <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference"></div>
                            </button>
                            <button className="px-8 py-4 border border-gray-700 hover:border-white text-gray-400 hover:text-white font-mono uppercase tracking-wider transition-colors">
                                Read Whitepaper
                            </button>
                        </div>
                    </motion.div>

                    <div className="hidden lg:block">
                        <CyberHero />
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <div className="border-y border-defi-800 bg-defi-900/50 py-4 overflow-hidden relative z-10">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="whitespace-nowrap flex gap-12 text-gray-500 font-mono text-sm uppercase tracking-widest"
                >
                    {[...Array(10)].map((_, i) => (
                        <React.Fragment key={i}>
                            <span>• Secure Storage</span>
                            <span>• Immutable Smart Contracts</span>
                            <span>• Audited Security</span>
                            <span>• High Yield APY</span>
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>

            {/* Features Grid */}
            <section className="relative z-10 py-32 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">System Modules</h2>
                            <p className="text-gray-500 font-mono">/// ACTIVE AND UPCOMING PROTOCOLS</p>
                        </div>
                        <div className="hidden md:block text-right font-mono text-xs text-gray-600">
                            <p>SYSTEM_STATUS: ONLINE</p>
                            <p>UPTIME: 99.99%</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Lock}
                            title="Time-Locked Vaults"
                            description="Cryptographically secured time capsules for your assets. Define your lock period and eliminate the temptation to sell early."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Real-Time Yield"
                            description="Dynamic APY generation through automated DeFi strategies. Watch your wealth compound in real-time."
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Immutable Security"
                            description="Smart contracts audited by top firms. Non-custodial architecture ensures you always own your keys."
                        />
                        <FeatureCard
                            icon={Brain}
                            title="AI Portfolio"
                            description="Predictive analytics engine that suggests optimal lock periods based on market sentiment and historical data."
                            isFuture
                        />
                        <FeatureCard
                            icon={Database}
                            title="Decentralized Backup"
                            description="Vault metadata stored on IPFS/Arweave ensures your data persists even if our servers go dark."
                            isFuture
                        />
                        <FeatureCard
                            icon={UserCheck}
                            title="Dead Man's Switch"
                            description="Legacy protocol that automatically transfers access to a designated beneficiary after prolonged inactivity."
                            isFuture
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-32 px-6 border-t border-defi-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
                        Ready to <span className="text-defi-accent">Commit?</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Join thousands of disciplined investors building generational wealth through enforced holding.
                    </p>
                    <button
                        onClick={handleEnter}
                        className="px-12 py-6 bg-white text-black font-bold text-xl uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                        Initialize Vault
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-6 border-t border-defi-800 bg-black text-center">
                <p className="text-gray-600 font-mono text-sm">
                    © 2024 CHRONOVAULT PROTOCOL. ALL RIGHTS RESERVED. <br />
                    <span className="text-xs opacity-50">BUILT FOR THE LONG TERM.</span>
                </p>
            </footer>
        </div>
    );
};
