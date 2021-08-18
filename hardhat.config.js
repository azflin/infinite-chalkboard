require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
    // hardhat: {
    //   mining: {
    //     auto: false,
    //     interval: 5000
    //   }
    // }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
