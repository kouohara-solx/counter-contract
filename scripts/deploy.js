// scripts/deploy_nft.js
async function main() {
  const MyContractOwnable = await ethers.getContractFactory("MyContractOwnable");
  const myContractOwnable = await MyContractOwnable.deploy();

  await myContractOwnable.waitForDeployment();

  console.log("MyContractOwnable deployed to:", await myContractOwnable.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });