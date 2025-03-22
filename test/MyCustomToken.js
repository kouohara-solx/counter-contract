const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyCustomToken", function () {
  let myCustomToken;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const MyCustomToken = await ethers.getContractFactory("MyCustomToken");
    myCustomToken = await MyCustomToken.deploy(1000);
    await myCustomToken.waitForDeployment();
  });

  it("正しい名前とシンボル名を持っているか", async function () {
    expect(await myCustomToken.name()).to.equal("MyCustomToken");
    expect(await myCustomToken.symbol()).to.equal("MCT");
  });

  it("オーナーは初期供給量をミントできるか", async function () {
    expect(await myCustomToken.balanceOf(owner.address)).to.equal(1000);
  });

  it("オーナーに追加のトークンをミントできるか", async function () {
    await myCustomToken.mint(addr1.address, 500);
    expect(await myCustomToken.balanceOf(addr1.address)).to.equal(500);
  });

  it("オーナー以外はトークンをミントできない", async function () {
    await expect(
      myCustomToken.connect(addr1).mint(addr1.address, 500)
    ).to.be.revertedWithCustomError(
      myCustomToken,
      "OwnableUnauthorizedAccount"
    );
  });
  it("バーンできるか", async function () {
    await myCustomToken.burn(100);
    expect(await myCustomToken.balanceOf(owner.address)).to.equal(900);
  });
});
