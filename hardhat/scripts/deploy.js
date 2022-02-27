const { ethers } = require("hardhat");

async function main() {
  const petitionContract = await ethers.getContractFactory("DePetition");
  const deployedPetitionContract = await petitionContract.deploy();

  await deployedPetitionContract.deployed();
  console.log(
    "Decentralized Petition Contract Address:",
    deployedPetitionContract.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
