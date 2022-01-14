/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber, ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { Decentragram, Decentragram__factory } from "../typechain";

require("chai").use(require("chai-as-promised")).should();

describe("Decentragram", function () {
  let Decentragram: Decentragram__factory;
  let decentragram: Decentragram;
  // let accounts: SignerWithAddress[];
  let author: SignerWithAddress;
  let deployer: string;
  let tipper: SignerWithAddress;

  before(async () => {
    Decentragram = await ethers.getContractFactory("Decentragram");
    decentragram = await Decentragram.deploy();
    deployer = await decentragram.address;
    [author, tipper] = await ethers.getSigners();
  });

  it("Deployment succesfully", async () => {
    expect(deployer).to.not.equal(0x0);
    expect(deployer).to.not.equal("");
    expect(deployer).to.not.equal(null);
    expect(deployer).to.not.equal(undefined);
  });

  it("Has a name", async function () {
    await decentragram.deployed();

    expect(await decentragram.name()).to.equal("Decentragram");
  });

  describe("Images", async () => {
    const hash = "ALÓ";
    let result: ContractTransaction;
    let imageCount: BigNumber;
    let image: {
      id: BigNumber;
      hash: string;
      description: string;
      tipAmount: BigNumber;
      autor: string;
    };

    before(async () => {
      result = await decentragram.uploadImages(hash, "AAAA", {
        from: author.getAddress(),
      });
      image = await decentragram.images(0);
      imageCount = await decentragram.imageCounter();
    });

    it("Check `image` values", async function () {
      expect(image).to.not.equal(null);
      expect(imageCount).to.equal(1);
    });

    it("Check created image's attributes", async function () {
      const wait = await result.wait();
      const event = wait.events?.pop()?.args;

      const [_id, _hash, _description, _tipAmount, _owner] = event;

      expect(_id).to.equal(image.id);
      expect(_hash).to.equal(image.hash);
      expect(_description).to.equal(image.description);
      expect(_tipAmount).to.equal(0);
      expect(_owner).to.equal(image.autor);
    });

    it("Reject on 'null' hash", async function () {
      await decentragram.uploadImages(null, hash, {
        from: author.getAddress(),
        // @ts-ignore
      }).should.be.rejected;
    });

    it("Reject on 'null' description", async function () {
      await decentragram.uploadImages(hash, null, {
        from: author.getAddress(),
        // @ts-ignore
      }).should.be.rejected;
    });

    it("Reject when sender is incorrect", async function () {
      await decentragram.uploadImages(hash, "sender is null", {
        from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226",
        // @ts-ignore
      }).should.be.rejected;
    });

    it("List images, check Struc", async function () {
      const _image = await decentragram.images(
        Number(await decentragram.imageCounter()) - 1
      );

      expect(_image.id).to.equal(image.id);
      expect(_image.hash).to.equal(image.hash);
      expect(_image.description).to.equal(image.description);
      expect(_image.tipAmount).to.equal(0);
      expect(_image.autor).to.equal(image.autor);
    });
  });
});
