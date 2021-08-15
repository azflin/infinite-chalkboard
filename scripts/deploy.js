async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const InfiniteChalkboard = await ethers.getContractFactory("InfiniteChalkboard");
  const infiniteChalkboard = await InfiniteChalkboard.deploy();

  console.log("InfiniteChalkboard address:", infiniteChalkboard.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });