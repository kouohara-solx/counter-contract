// test/MyCustomNFT.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyCustomNFT", function () {
  let myCustomNFT;
  let owner;
  let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        const MyCustomNFT = await ethers.getContractFactory("MyCustomNFT");
        myCustomNFT = await MyCustomNFT.deploy();
        await myCustomNFT.waitForDeployment();
    });

    it("Should allow owner to mint NFTs", async function () {
        const tokenURI = "https://example.com/nft/1.json";
        const tx = await myCustomNFT.mintNFT(addr1.address, tokenURI);
        const receipt = await tx.wait();
        // イベントからトークンIDを取得
        const event = receipt.events ? receipt.events.find(event => event.event === 'Transfer') : undefined;
        const tokenId = event.args.tokenId;

        expect(await myCustomNFT.ownerOf(tokenId)).to.equal(addr1.address);
        expect(await myCustomNFT.tokenURI(tokenId)).to.equal(tokenURI);
    });
});