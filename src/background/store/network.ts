import { EVMNetwork, NetworkState } from "../types/network";
import Config from "../../exconfig";

const defaultNetwork: EVMNetwork = Config.network || {
    chainID: '5',
    family: 'EVM',
    name: 'Goerli',
    provider: 'https://goerli.infura.io/v3/bdabe9d2f9244005af0f566398e648da',
    entryPointAddress: '0x0F46c65C17AA6b4102046935F33301f0510B163A',
    bundler:
      'https://app.stackup.sh/api/v1/bundler/96771b1b09e802669c33a3fc50f517f0f514a40da6448e24640ecfd83263d336',
    baseAsset: {
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
      image:
        'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/6ed5f/eth-diamond-black.webp',
    },
  };
  
  export const initialNetworkState: NetworkState= {
    activeNetwork:defaultNetwork,
    supportedNetworks: [defaultNetwork]
  }