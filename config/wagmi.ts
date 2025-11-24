import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
    appName: 'ChronoVault',
    projectId: 'YOUR_PROJECT_ID', // Get one from WalletConnect Cloud
    chains: [sepolia],
    transports: {
        [sepolia.id]: http(),
    },
});
