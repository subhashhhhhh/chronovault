import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
    appName: 'ChronoVault',
    projectId: '7a146f4955510ef2697c4c0c341ef257', // Get one from WalletConnect Cloud
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
});
