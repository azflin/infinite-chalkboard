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

  it("Should set author to msg.sender after deployment", async function () {
    expect(await infiniteChalkboard.author()).to.equal(owner.address);
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

  it("Should pay previous author and contract", async function () {
    // Addr1 writes. Check contract balance and owner balances have increased correctly
    let ownerBalance = await ethers.provider.getBalance(owner.address);
    await infiniteChalkboard.connect(addr1).write("Hello World!", {value: ethers.utils.parseEther("0.1")});
    let valueToPriorAuthor = ethers.utils.parseEther("0.1").mul(109).div(110);
    expect(await ethers.provider.getBalance(owner.address)).to.equal(ownerBalance.add(valueToPriorAuthor));
    let contractBalance = await ethers.provider.getBalance(infiniteChalkboard.address);
    expect(contractBalance).to.equal(ethers.utils.parseEther("0.1").sub(valueToPriorAuthor));
    
    // Addr 2 writes. Check contract balance and addr1 balances have increased correctly
    let addr1Balance = await ethers.provider.getBalance(addr1.address);
    await infiniteChalkboard.connect(addr2).write("Hello World 2!", {value: ethers.utils.parseEther("0.11")});
    valueToPriorAuthor = ethers.utils.parseEther("0.11").mul(109).div(110);
    expect(await ethers.provider.getBalance(addr1.address)).to.equal(addr1Balance.add(valueToPriorAuthor));
    expect(await ethers.provider.getBalance(infiniteChalkboard.address)).to.equal(contractBalance.add(ethers.utils.parseEther("0.11").sub(valueToPriorAuthor)));
  });

  it("Should increase cost by 10% each write", async function () {
    await infiniteChalkboard.write("Hello World!", {value: ethers.utils.parseEther("0.1")});
    expect(await infiniteChalkboard.cost()).to.equal(ethers.utils.parseEther("0.11"));
    await infiniteChalkboard.write("Hello World 2!", {value: ethers.utils.parseEther("0.11")});
    expect(await infiniteChalkboard.cost()).to.equal(ethers.utils.parseEther("0.121"));
    await infiniteChalkboard.write("Hello World 3!", {value: ethers.utils.parseEther("0.121")});
    expect(await infiniteChalkboard.cost()).to.equal(ethers.utils.parseEther("0.1331"));
  });
});