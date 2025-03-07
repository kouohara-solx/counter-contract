const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  it("Should return the new count once it's changed", async function () {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();

    await counter.waitForDeployment(); // ethers.js v6 以降の書き方

    expect(await counter.getCount()).to.equal(0);

    const setCounterTx = await counter.increment();

    // wait until the transaction is mined
    await setCounterTx.wait();

    expect(await counter.getCount()).to.equal(1);
  });
});