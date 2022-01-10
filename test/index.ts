/* eslint-disable camelcase */
import { expect } from "chai";
import { ethers } from "hardhat";
import { Decentragram, Decentragram__factory } from "../typechain";

describe("Decentragram", function () {
  let Decentragram: Decentragram__factory;
  let decentragram: Decentragram;

  before(async () => {
    Decentragram = await ethers.getContractFactory("Decentragram");
    decentragram = await Decentragram.deploy();
  });

  it("Deployment succesfully", async () => {
    const address = await decentragram.address;

    expect(address).to.not.equal(0x0);
    expect(address).to.not.equal("");
    expect(address).to.not.equal(null);
    expect(address).to.not.equal(undefined);
  });

  it("Has a name", async function () {
    await decentragram.deployed();

    expect(await decentragram.name()).to.equal("Decentragram");
  });

  describe("Image", async () => {
    it("Create an image", async function () {
      await decentragram.uploadImages("ABC", "TEST");

      const image = await decentragram.images(10);

      console.log({ image });
    });
  });
});
