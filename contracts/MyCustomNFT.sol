// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCustomNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("MyCustomNFT", "MCNFT") Ownable(msg.sender) {

    }

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        uint256 newItemId = _tokenIdCounter;
        _tokenIdCounter += 1;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI); // メタデータURIを設定
        return newItemId;
    }
}