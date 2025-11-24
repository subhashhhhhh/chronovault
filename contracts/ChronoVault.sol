// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ChronoVault is ReentrancyGuard {
    IERC20 public token;
    
    struct Deposit {
        uint256 amount;
        uint256 unlockTime;
        bool withdrawn;
    }
    
    mapping(address => Deposit[]) public userDeposits;
    uint256 public totalValueLocked;

    event Deposited(address indexed user, uint256 amount, uint256 unlockTime);
    event Withdrawn(address indexed user, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function deposit(uint256 _amount, uint256 _lockDays) external nonReentrant {
        require(_amount > 0, "Amount must be > 0");
        require(_lockDays > 0, "Lock days must be > 0");

        token.transferFrom(msg.sender, address(this), _amount);
        
        userDeposits[msg.sender].push(Deposit({
            amount: _amount,
            unlockTime: block.timestamp + (_lockDays * 1 days),
            withdrawn: false
        }));

        totalValueLocked += _amount;
        emit Deposited(msg.sender, _amount, block.timestamp + (_lockDays * 1 days));
    }

    function withdraw(uint256 _depositIndex) external nonReentrant {
        require(_depositIndex < userDeposits[msg.sender].length, "Invalid index");
        Deposit storage userDeposit = userDeposits[msg.sender][_depositIndex];
        
        require(!userDeposit.withdrawn, "Already withdrawn");
        require(block.timestamp >= userDeposit.unlockTime, "Still locked");

        userDeposit.withdrawn = true;
        totalValueLocked -= userDeposit.amount;
        
        token.transfer(msg.sender, userDeposit.amount);
        emit Withdrawn(msg.sender, userDeposit.amount);
    }

    function getUserDeposits(address _user) external view returns (Deposit[] memory) {
        return userDeposits[_user];
    }
}
