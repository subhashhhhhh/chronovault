import { parseAbi } from 'viem';

export const MOCK_TOKEN_ADDRESS = import.meta.env.VITE_PUBLIC_MOCK_TOKEN_ADDRESS as `0x${string}`;
export const CHRONO_VAULT_ADDRESS = import.meta.env.VITE_PUBLIC_CHRONO_VAULT_ADDRESS as `0x${string}`;

export const MOCK_TOKEN_ABI = parseAbi([
    "function mint(uint256 amount) external",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)"
]);

export const CHRONO_VAULT_ABI = parseAbi([
    "struct Deposit { uint256 amount; uint256 unlockTime; bool withdrawn; }",
    "function deposit(uint256 _amount, uint256 _lockDays) external",
    "function withdraw(uint256 _depositIndex) external",
    "function getUserDeposits(address _user) external view returns (Deposit[])",
    "function totalValueLocked() external view returns (uint256)"
]);
