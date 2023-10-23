require("@nomiclabs/hardhat-waffle");
require("hardhat-abi-exporter");

const GOERLI_PRIVATE_KEY = '425afc37a946bf46236ef5523635311b7c682b9501b88e53dbfe24ad39072afc';
const API_KEY = 'R-v7OHSbutUMnsyovyWZEIPQRxlN8KoW';

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