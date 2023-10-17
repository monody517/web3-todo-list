require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");
import { GOERLI_PRIVATE_KEY,API_KEY } from './env';

module.exports = {
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    pretty: false,
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
    // goerli: {
    //   url: `https://goerli.infura.io/v3/${API_KEY}`,
    //   accounts: [PRIVATE_KEY],
    // }
  },
  solidity: "0.8.19",
};