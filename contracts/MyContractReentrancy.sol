// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MyContractReentrancy is ReentrancyGuard {
    uint public myValue;

    function myVulnerableFunction() public nonReentrant {
        // ... (外部コントラクトを呼び出す可能性のある処理) ...
        myValue = 0;
    }
}