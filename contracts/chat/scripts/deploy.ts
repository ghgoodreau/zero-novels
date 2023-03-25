import { ethers } from "hardhat";

async function main() {
  const ChatRecord = await ethers.getContractFactory("ChatRecord");
  const chatRecord = await ChatRecord.deploy();

  await chatRecord.deployed();

  console.log(`deployed to ${chatRecord.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
