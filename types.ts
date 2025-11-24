export interface Deposit {
  id: string;
  amount: number;
  timestamp: number;
  unlockDate: number;
  accruedInterest: number;
}

export interface VaultStats {
  tvl: number; // Total Value Locked
  apr: number; // Annual Percentage Rate
  lockPeriodDays: number;
  penaltyRate: number; // e.g. 0.10 for 10%
  isPaused: boolean;
}

export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'STAKE' | 'VOTE';

export interface TransactionRecord {
  id: string;
  type: TransactionType;
  amount: number;
  timestamp: number;
  hash: string;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED';
}

export interface UserAccount {
  address: string;
  balance: number; // Wallet balance of the token
  allowance: number; // Allowance given to the vault
  deposits: Deposit[];
  history: TransactionRecord[];
  isAdmin: boolean;
}

export enum TransactionStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface TransactionState {
  status: TransactionStatus;
  message?: string;
}

// New Types for Mock Features
export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endDate: number;
  status: 'ACTIVE' | 'PASSED' | 'REJECTED';
}

export interface StakingPool {
  id: string;
  name: string;
  apy: number;
  totalStaked: number;
  userStaked: number;
}