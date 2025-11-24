# Backend Integration Guide

This frontend is designed to be "plug-and-play" for blockchain integration. Currently, it uses a `MockChainService` to simulate blockchain interactions. This guide explains how to replace the mock service with real smart contract calls using `ethers.js` or `wagmi`.

## 1. Prerequisites

-   **Smart Contract**: Deployed Time-Locked Vault contract (Solidity).
-   **ABI**: The JSON ABI of your compiled contract.
-   **Contract Address**: The public address of your deployed contract.
-   **Libraries**: Install `ethers` or `wagmi` + `viem`.
    ```bash
    npm install ethers
    # OR
    npm install wagmi viem @tanstack/react-query
    ```

## 2. Configuration

Create a `config.ts` file in `src/services/` to store your contract details.

```typescript
// src/services/config.ts
export const CONTRACT_ADDRESS = "0xYourContractAddress...";
export const VAULT_ABI = [
  // ... Paste your ABI here
  "function deposit(uint256 amount) external",
  "function withdraw(uint256 depositId) external",
  "function getVaultStats() external view returns (uint256, uint256, uint256, uint256, bool)",
  // ...
];
```

## 3. Replacing MockChainService

The application interacts with data via `src/services/mockChain.ts`. To integrate the backend, create a new service file (e.g., `web3Service.ts`) that implements the same methods but calls the smart contract.

### Example Implementation (Ethers.js)

```typescript
// src/services/web3Service.ts
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, VAULT_ABI } from './config';
import { UserAccount, VaultStats } from '../types';

let provider: ethers.BrowserProvider;
let signer: ethers.JsonRpcSigner;
let contract: ethers.Contract;

export const Web3Service = {
  connectWallet: async (): Promise<UserAccount> => {
    if (!window.ethereum) throw new Error("No wallet found");
    
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, VAULT_ABI, signer);
    
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    
    // Fetch user data from contract
    // const userData = await contract.getUserData(address);

    return {
      address,
      balance: Number(ethers.formatEther(balance)),
      allowance: 0, // Fetch real allowance
      deposits: [], // Map contract deposits to Deposit[]
      history: [], // Fetch events
      isAdmin: false // Check role
    };
  },

  getVaultStats: async (): Promise<VaultStats> => {
    // const stats = await contract.getVaultStats();
    return {
      tvl: 0, // Number(ethers.formatEther(stats.tvl)),
      apr: 0, // Number(stats.apr),
      lockPeriodDays: 365,
      penaltyRate: 0.1,
      isPaused: false
    };
  },

  deposit: async (amount: number): Promise<void> => {
    const tx = await contract.deposit(ethers.parseEther(amount.toString()));
    await tx.wait();
  },

  withdraw: async (depositId: string): Promise<void> => {
    const tx = await contract.withdraw(depositId);
    await tx.wait();
  },
  
  // Implement other methods...
};
```

## 4. Swapping the Service

Once `Web3Service` is ready, update `src/context/VaultContext.tsx` to use it instead of `MockChainService`.

```diff
- import { MockChainService } from '../services/mockChain';
+ import { Web3Service } from '../services/web3Service';

// ... inside VaultProvider
const refreshData = async () => {
-  const s = await MockChainService.getVaultStats();
+  const s = await Web3Service.getVaultStats();
   // ...
};
```

## 5. Handling Events

For the **History** tab, you should query blockchain events (logs).

```typescript
const filter = contract.filters.Deposit(userAddress);
const logs = await contract.queryFilter(filter);
// Map logs to TransactionRecord[]
```

## 6. Admin Functions

Ensure your smart contract has `onlyOwner` modifiers for these functions.

-   `setAPR(uint256 newApr)`
-   `togglePause()`

Connect these to the `AdminPanel` component via the service.
