export const MOCK_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // Update after deployment
export const CHRONO_VAULT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Update after deployment

export const MOCK_TOKEN_ABI = [
    "function mint(uint256 amount) external",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
    "function allowance(address owner, address spender) external view returns (uint256)"
] as const;

export const CHRONO_VAULT_ABI = [
    "function deposit(uint256 _amount, uint256 _lockDays) external",
    "function withdraw(uint256 _depositIndex) external",
    "function getUserDeposits(address _user) external view returns (tuple(uint256 amount, uint256 unlockTime, bool withdrawn)[])",
    "function totalValueLocked() external view returns (uint256)"
] as const;
