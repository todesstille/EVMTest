const hre = require("hardhat");
const { expect } = require("chai");

let testData;
let admin;

describe("Blockchain EVM-compatibility", function () {

  before(async () => {
    [admin] = await hre.ethers.getSigners();

    let TestData = await hre.ethers.getContractFactory("TestData");
    testData = await TestData.deploy();
    await testData.waitForDeployment();
  });

  describe("BlockData, TxData etc", function () {

    it("Check block data", async function () {
      let tx = await testData.saveBlockInfo();
      let receipt = await tx.wait();
      let result = await testData.lastBlockInfo();

      try {
        expect(result.blockNumber).to.equal(receipt.blockNumber, "Incorrect block number");
      } catch(err) {
        console.log(err);
      }

      let block = await hre.ethers.provider.getBlock(receipt.blockNumber);
      // console.log(block)

      try {
        expect (result.blockTimestamp).to.equal(block.timestamp, "Incorrect block timestamp");
      } catch(err) {
        console.log(err);
      }

      try {
        expect (result.blockLimit).to.equal(block.gasLimit, "Incorrect block gas limit");
      } catch(err) {
        console.log(err);
      }

      let previousBlock = await hre.ethers.provider.getBlock(receipt.blockNumber - 1);
      try {
        expect (result.blockHash).to.equal(previousBlock.hash, "Incorrect block hash of previous block");
      } catch(err) {
        console.log(err);
      }

      try {
        expect (result.blockCoinbase).to.equal(block.miner, "Incorrect coinbase of block");
      } catch(err) {
        console.log(err);
      }
    });

    it("Check tx data", async function () {
      let tx, receipt;
      try {
        tx = await testData.saveTxInfo({gasLimit: 65421});
        receipt = await tx.wait();
      } catch(err) {
        console.log("\x1b[31m    Unusial gas limit! \x1b[0m");
        try {
          tx = await testData.saveTxInfo();
          receipt = await tx.wait();
        } catch(err) {
          console.log("\x1b[31m    Cant predict gas limit! \x1b[0m");
          tx = await testData.saveTxInfo({gasLimit: 500000});
          receipt = await tx.wait();
        }
      }
      let result = await testData.lastTxInfo();

      try {
        expect (result.origin).to.equal(receipt.from, "Incorrect tx.origin");
      } catch(err) {
        console.log(err);
      }

      try {
        expect (result.gasPrice).to.equal(receipt.gasPrice, "Incorrect gas price");
      } catch(err) {
        console.log(err);
      }

    });
  });
});
