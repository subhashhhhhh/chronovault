import { UserAccount, VaultStats, GovernanceProposal, StakingPool, TransactionRecord } from '../types';

// Mock Data Store
const MOCK_DELAY = 800;

const mockStats: VaultStats = {
  tvl: 12500000,
  apr: 12.5,
  lockPeriodDays: 365,
  penaltyRate: 0.15,
  isPaused: false,
};

const mockUser: UserAccount = {
  address: "0x71C...9A23",
  balance: 5000,
  allowance: 0,
  deposits: [
    { id: '1', amount: 1000, timestamp: Date.now() - 10000000, unlockDate: Date.now() + 30000000, accruedInterest: 50 },
    { id: '2', amount: 2500, timestamp: Date.now() - 5000000, unlockDate: Date.now() + 25000000, accruedInterest: 120 }
  ],
  history: [
    { id: 'tx1', type: 'DEPOSIT', amount: 1000, timestamp: Date.now() - 10000000, hash: '0xabc...123', status: 'CONFIRMED' },
    { id: 'tx2', type: 'DEPOSIT', amount: 2500, timestamp: Date.now() - 5000000, hash: '0xdef...456', status: 'CONFIRMED' }
  ],
  isAdmin: true
};

const mockProposals: GovernanceProposal[] = [
  { id: '1', title: 'Increase APY to 15%', description: 'Proposal to increase the base APY to attract more liquidity.', votesFor: 150000, votesAgainst: 20000, endDate: Date.now() + 86400000 * 2, status: 'ACTIVE' },
  { id: '2', title: 'Reduce Lock Period', description: 'Reduce the mandatory lock period from 365 days to 180 days.', votesFor: 45000, votesAgainst: 120000, endDate: Date.now() - 86400000, status: 'REJECTED' }
];

const mockPools: StakingPool[] = [
  { id: '1', name: 'USDC-ETH LP', apy: 24.5, totalStaked: 5000000, userStaked: 0 },
  { id: '2', name: 'CHRONO Single Stake', apy: 45.0, totalStaked: 2000000, userStaked: 500 }
];

export const MockChainService = {
  connectWallet: async (): Promise<UserAccount> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockUser;
  },

  getVaultStats: async (): Promise<VaultStats> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockStats;
  },

  getUserData: async (address?: string): Promise<UserAccount> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockUser;
  },

  getGovernanceProposals: async (): Promise<GovernanceProposal[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockProposals;
  },

  getStakingPools: async (): Promise<StakingPool[]> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return mockPools;
  },

  // Mock Actions
  deposit: async (address: string, amount: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY * 2));
    console.log(`Deposited ${amount} for ${address}`);
  },

  withdraw: async (address: string, isEarly: boolean): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY * 2));
    console.log(`Withdrew for ${address}. Early: ${isEarly}`);
  }
};