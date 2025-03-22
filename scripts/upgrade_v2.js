const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyUpgradableContractV2 = await ethers.getContractFactory(
    "MyUpgradableContractV2"
  );
  const upgraded = await upgrades.upgradeProxy(
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    MyUpgradableContractV2
  ); // 0x... はdeploy_upgradeable_v1.jsで表示されたアドレス

  console.log("MyUpgradableContract upgraded");
}

main();
