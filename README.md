# ChronoVault ⏳🔒

> **Time is Money.** The world's first cyber-secure, time-locked savings protocol.

![ChronoVault Banner](https://via.placeholder.com/1200x400/000000/dc2626?text=CHRONOVAULT+PROTOCOL)

## 📖 Overview

**ChronoVault** is a decentralized finance (DeFi) platform designed to help users build generational wealth through enforced holding. Users deposit ERC-20 tokens into a smart contract vault for a fixed lock period to earn high-yield APY.

The protocol features a **"Cyber Brutalist"** aesthetic, emphasizing security, immutability, and the raw power of code. While this version runs as a frontend prototype with simulated blockchain interactions, it is architected for seamless integration with real Ethereum/EVM smart contracts.

## ✨ Features

### 🛡️ Core Protocol
-   **Time-Locked Vaults**: Deposit assets for a fixed duration (e.g., 365 days).
-   **Real-Time Yield**: Earn compound interest (APY) on your locked assets.
-   **Early Withdrawal Penalty**: Users can withdraw early but face a steep penalty (e.g., 15%) on their principal, incentivizing long-term holding.
-   **Emergency Controls**: Admin ability to pause deposits in case of security events.

### 💻 User Interface
-   **Cyber Brutalist Design**: High-contrast, monospace typography, and glitch animations.
-   **Interactive Dashboard**:
    -   **Overview**: Real-time stats on TVL, APY, and personal balance.
    -   **Vault Operations**: Seamless deposit and withdrawal flows.
    -   **Yield Farms**: View and interact with staking pools.
    -   **Governance**: Vote on protocol parameters (APY changes, lock periods).
    -   **History**: Transparent on-chain activity log.
-   **3D Visuals**: Custom CSS-based 3D animations.

### 🔧 Admin Console
-   **Dynamic APR**: Adjust the Annual Percentage Yield based on market conditions.
-   **Circuit Breaker**: Pause/Unpause the protocol globally.

## 🛠️ Tech Stack

-   **Frontend**: React 19, TypeScript, Vite
-   **Styling**: TailwindCSS, Custom CSS (Glitch/3D effects)
-   **Animation**: Framer Motion
-   **Routing**: React Router DOM
-   **State Management**: React Context API
-   **Icons**: Custom SVG Components (Zero dependency)

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/chronovault.git
    cd chronovault
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the app**
    Visit `http://localhost:5173` in your browser.

## 🔗 Backend Integration

This project is currently configured to use a **Mock Chain Service** (`src/services/mockChain.ts`) to simulate blockchain latency and data.

To connect this frontend to a real Ethereum Smart Contract (Solidity), please refer to the detailed **[Integration Guide](INTEGRATION_GUIDE.md)**.

It covers:
-   Setting up `ethers.js` or `wagmi`.
-   Configuring Contract ABI and Addresses.
-   Replacing mock methods with real contract calls.

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Stats, etc.)
│   └── ui/           # Primitive UI elements (Icons, Modals)
├── context/          # Global State (VaultContext)
├── layouts/          # Page layouts (DashboardLayout)
├── pages/            # Route components (Landing, Vault, Admin, etc.)
├── services/         # MockChainService & Future Web3Service
└── types.ts          # TypeScript interfaces
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built for the Long Term.</sub>
</div>
