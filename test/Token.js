const { expect } = require("chai");
const { ethers } = require("hardhat");
describe("Token Contract", function () {
  it("Once Deployed, owner should have 1000 token", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hhtoken = await Token.deploy();
    console.log(hhtoken);

    const ownerBalance = await hhtoken.balanceOf(owner?.address);
    console.log(owner.address);

    expect(await hhtoken.totalSupply()).to.equal(ownerBalance);
  });

  it("Once transfer function is called then transfer of token from the owner to some account", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("Token");
    const hhtoken = await Token.deploy();
    console.log(hhtoken);

    await hhtoken.transfer(addr1.address, 100);
    const bal1 = await hhtoken.balanceOf(owner.address);
    const bal2 = await hhtoken.balanceOf(addr1.address);

    expect(bal1).to.equal(900);
    expect(bal2).to.equal(100);
  });
});
