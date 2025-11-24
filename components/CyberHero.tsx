import React from 'react';
import { motion } from 'framer-motion';

const OrbitalRing = ({ size, duration, delay = 0, reverse = false, axis = 'z' }: { size: number, duration: number, delay?: number, reverse?: boolean, axis?: 'x' | 'y' | 'z' }) => {
    const rotateProp = axis === 'x' ? 'rotateX' : axis === 'y' ? 'rotateY' : 'rotate';

    return (
        <motion.div
            animate={{ [rotateProp]: reverse ? -360 : 360 }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
            className={`absolute rounded-full border border-defi-800/50 border-dashed flex items-center justify-center`}
            style={{
                width: size,
                height: size,
                borderWidth: '1px'
            }}
        >
            <div className="absolute top-0 w-2 h-2 bg-defi-accent rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        </motion.div>
    );
};

export const CyberHero = () => {
    return (
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000 overflow-hidden">
            {/* Background Grid Glow */}
            <div className="absolute inset-0 bg-gradient-radial from-defi-900/20 to-transparent opacity-50 pointer-events-none" />

            {/* Complex Orbital System */}
            <div className="absolute inset-0 flex items-center justify-center preserve-3d transform-style-3d">
                <OrbitalRing size={500} duration={25} axis="z" />
                <OrbitalRing size={400} duration={20} reverse axis="z" />
                <OrbitalRing size={550} duration={30} delay={2} axis="x" />
                <OrbitalRing size={450} duration={22} reverse axis="y" />
            </div>

            {/* Central Cube Structure */}
            <div className="relative w-64 h-64 preserve-3d animate-spin-slow">
                {/* Inner Glowing Core */}
                <motion.div
                    animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 m-auto w-32 h-32 bg-defi-accent/20 blur-xl rounded-full"
                />

                {/* Cube Faces */}
                {[
                    { text: "LOCK", trans: "translateZ(128px)", border: "border-defi-accent", bg: "bg-defi-accent/5" },
                    { text: "HODL", trans: "translateZ(-128px) rotateY(180deg)", border: "border-defi-700", bg: "bg-black/90" },
                    { text: "TIME", trans: "translateX(128px) rotateY(90deg)", border: "border-defi-700", bg: "bg-black/90" },
                    { text: "EARN", trans: "translateX(-128px) rotateY(-90deg)", border: "border-defi-accent", bg: "bg-defi-accent/5" },
                    { text: "TOP", trans: "translateY(-128px) rotateX(90deg)", border: "border-defi-700", bg: "bg-black/90" },
                    { text: "BTM", trans: "translateY(128px) rotateX(-90deg)", border: "border-defi-700", bg: "bg-black/90" }
                ].map((face, i) => (
                    <div key={i}
                        className={`absolute inset-0 border-2 ${face.border} ${face.bg} backdrop-blur-sm flex items-center justify-center group`}
                        style={{ transform: face.trans }}
                    >
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white/50" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white/50" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white/50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white/50" />

                        {/* Content */}
                        <span className={`font-mono text-4xl font-bold tracking-widest ${face.text === 'LOCK' || face.text === 'EARN' ? 'text-defi-accent' : 'text-gray-500'}`}>
                            {face.text !== 'TOP' && face.text !== 'BTM' ? face.text : ''}
                        </span>

                        {/* Scanning Line Effect */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-defi-accent/50 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
                        />
                    </div>
                ))}
            </div>

            {/* Floating Data Cards */}
            <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-10 p-4 border border-defi-accent bg-black/90 backdrop-blur z-20 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
            >
                <div className="text-xs text-gray-500 mb-1">APY RATE</div>
                <div className="text-2xl font-bold text-white">12.5%</div>
                <div className="h-1 w-full bg-gray-800 mt-2 overflow-hidden">
                    <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/2 bg-defi-accent"
                    />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 left-0 p-4 border border-white/20 bg-black/90 backdrop-blur z-20"
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">SYSTEM SECURE</span>
                </div>
                <div className="font-mono text-xs text-defi-accent">
                    0x7f...3a2b
                </div>
            </motion.div>
        </div>
    );
};
