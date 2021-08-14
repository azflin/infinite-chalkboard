const { expect } = require("chai");

describe("InfiniteChalkboard contract", function () {
  it("Should have a cost of 0.1 ether", async function () {
    const [owner] = await ethers.getSigners();

    const InfiniteChalkboard = await ethers.getContractFactory("InfiniteChalkboard");

    const infiniteChalkboard = await InfiniteChalkboard.deploy();

    const cost = await infiniteChalkboard.cost();
    expect(cost).to.equal(ethers.utils.parseEther("0.1"));
  });
});