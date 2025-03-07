// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MyContractOwnable is Ownable {
    uint public myValue;

    constructor() Ownable(msg.sender) {}

    function setValue(uint _newValue) public onlyOwner {
        myValue = _newValue;
    }
}