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

  it("オーナーはNFTをミントできるか", async function () {
    const tokenURI = "https://example.com/nft/1.json";

    // イベントをリッスンしてトークン発行を確認
    await expect(myCustomNFT.mintNFT(addr1.address, tokenURI))
      .to.emit(myCustomNFT, "Transfer")
      .withArgs(ethers.ZeroAddress, addr1.address, 0);

    // トークンが正しく発行されたか確認
    expect(await myCustomNFT.ownerOf(0)).to.equal(addr1.address);
    expect(await myCustomNFT.tokenURI(0)).to.equal(tokenURI);
  });

  // 以下のようなテストケースを追加することも可能
  it("オーナー以外はNFTをミントできない", async function () {
    const tokenURI = "https://example.com/nft/2.json";

    await expect(
      myCustomNFT.connect(addr1).mintNFT(addr1.address, tokenURI)
    ).to.be.revertedWithCustomError(myCustomNFT, "OwnableUnauthorizedAccount");
  });
});
