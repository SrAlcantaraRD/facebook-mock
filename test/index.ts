/* eslint-disable camelcase */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "@nomiclabs/hardhat-web3";
import { expect } from "chai";
import { BigNumber, ContractTransaction } from "ethers";
import { ethers, web3, network } from "hardhat";
import { Decentragram } from "../typechain";

require("chai").use(require("chai-as-promised")).should();

describe("Decentragram", function () {
  let decentragram: Decentragram;
  // let accounts: SignerWithAddress[];
  let author: SignerWithAddress;
  let deployer: string;
  let tipper: SignerWithAddress;

  before(async () => {
    const Decentragram = await ethers.getContractFactory("Decentragram");
    decentragram = await Decentragram.deploy();
    await decentragram.deployed();

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
    let image: Image;

    before(async () => {
      result = await decentragram.connect(author).uploadImages(hash, "AAAA");

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

    it("Reject when hash is not defined", async function () {
      await expect(
        decentragram.uploadImages("", "description")
      ).to.be.revertedWith("Define a 'hash'");
    });

    it("Reject when description has not value", async function () {
      await expect(decentragram.uploadImages(hash, "")).to.be.revertedWith(
        "Define a 'description'"
      );
    });

    it("Reject when sender is incorrect", async function () {
      await expect(
        decentragram.uploadImages(hash, "NICE DESCRIPTION", {
          from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb9226",
        })
      ).to.be.reverted;
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

    describe("Allow users to tips images", async function () {
      const ammout = web3.utils.toWei("33", "ether");
      let _imageID: number;
      let _iniAutorBalance: string;
      let _iniTipperBalance: string;

      before(async () => {
        _imageID = Number(await decentragram.imageCounter()) - 1;

        _iniAutorBalance = (await author.getBalance()).toString();
        _iniTipperBalance = (await tipper.getBalance()).toString();

        await decentragram.connect(tipper).tipImageOwner(_imageID, {
          value: ammout,
        });
      });

      it("Image tip amount is update", async function () {
        const image = await decentragram.images(_imageID);

        expect(image.tipAmount).to.equal(ammout);
      });

      it("Author balance is udated & higher", async function () {
        const autorBalace = (await author.getBalance()).toString();

        expect(Number(autorBalace)).to.not.equal(Number(_iniAutorBalance));
        expect(Number(autorBalace)).be.above(Number(_iniAutorBalance));
      });

      it("Tipper balance is udated & lower", async function () {
        const tipperBalace = (await tipper.getBalance()).toString();

        expect(Number(_iniAutorBalance)).to.not.equal(Number(tipperBalace));
        expect(Number(_iniAutorBalance)).be.above(Number(tipperBalace));
      });

      // it("Tipper balance is udated", async function () {
      //   const tipperBalace = await web3.eth.getBalance(tipper.address);
      //   console.log({ tipperBalace, p: await tipper.getBalance() });
      //   const image = await decentragram.images(_imageID);
      //   console.log({ image, a: await author.getBalance() });

      //   expect(_iniTipperBalance).to.not.equal(tipperBalace);
      // });
      // 1. Enviar dinero

      // 2. Comprobar que se ha actualiado el "tipAmount" de la imagen

      // 3. Comprobar que ha llegado el dinero

      // 4. Comprobar que se ha restado el dinero
    });
  });
});

interface Image {
  id: BigNumber;
  hash: string;
  description: string;
  tipAmount: BigNumber;
  autor: string;
}
