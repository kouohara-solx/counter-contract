// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCustomToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * (10 ** 18); // 最大供給量

    constructor(uint256 initialSupply) ERC20("MyCustomToken", "MCT") Ownable(msg.sender) {
        require(initialSupply <= MAX_SUPPLY, "Initial supply exceeds max supply");
        _mint(msg.sender, initialSupply);
    }

    // 追加のミント関数（オーナーのみ）
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Total supply exceeds max supply");
        _mint(to, amount);
    }

    // バーン関数（トークンを破棄）
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // 内部関数をオーバーライドして、バーン前後の処理を追加することも可能
    function _update(address from, address to, uint256 value)
        internal
        override
    {
        super._update(from, to, value);
        // トークン転送前の処理
    }
}