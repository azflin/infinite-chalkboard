require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: {
      url: "http://localhost:8545",
      mining: {
        auto: false,
        interval: 5000
      }
    }
  }
};
