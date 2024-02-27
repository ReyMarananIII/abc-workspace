require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    sepolia:{
      url:process.env.JSON_RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
    },
  },
    };