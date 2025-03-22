const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyUpgradableContractV1 = await ethers.getContractFactory(
    "MyUpgradableContractV1"
  );
  const myUpgradableContract = await upgrades.deployProxy(
    MyUpgradableContractV1,
    [42],
    { initializer: "initialize" }
  );

  await myUpgradableContract.waitForDeployment();

  console.log(
    "MyUpgradableContract deployed to:",
    await myUpgradableContract.getAddress()
  );
}

main();
