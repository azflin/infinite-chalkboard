const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InfiniteChalkboard contract", function () {

  let InfiniteChalkboard;
  let infiniteChalkboard;

  beforeEach(async function () {
    InfiniteChalkboard = await ethers.getContractFactory("InfiniteChalkboard");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    infiniteChalkboard = await InfiniteChalkboard.deploy();
  });

  it("Should have a cost of 0.1 after deployment", async function () {
    expect(await infiniteChalkboard.cost()).to.equal(ethers.utils.parseEther("0.1"));
  });

  it("Should have an empty message after deployment", async function () {
    expect(await infiniteChalkboard.message()).to.equal("");
  });

  it("Should write a message", async function () {
    await infiniteChalkboard.write("Hello World!", {value: ethers.utils.parseEther("0.1")});
    expect(await infiniteChalkboard.message()).to.equal("Hello World!");
  });

  it("Should revert if insufficient payment", async function () {
    await expect(infiniteChalkboard.write("Hello World!", {value: ethers.utils.parseEther("0.09")})).to.be.revertedWith("Insufficient payment.");
  });
});