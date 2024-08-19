require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 99999,
      },
      evmVersion: "paris",
    },
  },
  networks: {
    hardhat: {
    },
    chapel: {
      url: process.env.BSC_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 6000000000,
    },
    bsc: {
      url: process.env.BSC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrum: {
      url: process.env.ARBITRUM_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    optimism: {
      url: process.env.OPTIMISM_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    bitlayer_testnet: {
      url: process.env.BITLAYER_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    conflux_testnet: {
      url: process.env.CONFLUX_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    base_sepolia: {
      url: process.env.BASE_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    atleta_testnet: {
      url: process.env.ATLETA_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  mocha: {
    timeout: 100000,
    bail: false,
  },
};
