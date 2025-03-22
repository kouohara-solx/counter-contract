// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MyUpgradableContractV2 is Initializable, OwnableUpgradeable{
    uint256 public myValue;
    uint256 public myNewValue; // 新しい状態変数を追加

    function initialize(uint256 _initialValue) public initializer {
        __Ownable_init(msg.sender);
        myValue = _initialValue;
    }

    function increment() public onlyOwner {
        myValue++;
    }

    function decrement() public onlyOwner { // 新しい関数を追加
        myValue--;
    }
}