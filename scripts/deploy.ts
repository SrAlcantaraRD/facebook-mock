// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const fs = require("fs");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Decentragram = await ethers.getContractFactory("Decentragram");
  const decentragram = await Decentragram.deploy();

  await decentragram.deployed();

  const stream = fs.createWriteStream("vue-app/.env");

  stream.once("open", function (fd) {
    stream.write(
      `VUE_APP_DECENTRAGRAM_CONTRACT_ADDRESS="${decentragram.address}"\n`
    );
    stream.end();
  });

  console.log("Decentragram deployed to:", decentragram.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
