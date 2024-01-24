// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract TestData {

    // ToDO: Think what to do with difficulty
    struct BlockInfo {
        uint256 blockNumber;
        uint256 blockTimestamp;
        uint256 blockLimit;
        bytes32 blockHash;
        address blockCoinbase;
    }

    struct TxInfo {
        address origin;
        uint256 gasPrice;
    }

    BlockInfo public lastBlockInfo;
    TxInfo public lastTxInfo;

    function saveBlockInfo() external {
        lastBlockInfo.blockNumber = block.number;
        lastBlockInfo.blockTimestamp = block.timestamp;
        lastBlockInfo.blockLimit = block.gaslimit;
        lastBlockInfo.blockHash = blockhash(block.number - 1);
        lastBlockInfo.blockCoinbase = block.coinbase;
    }

    function saveTxInfo() external {
        lastTxInfo.origin = tx.origin;
        lastTxInfo.gasPrice = tx.gasprice;
    }
}
