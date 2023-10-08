import Config from '../exconfig';
import { initialNetworkState } from './store/network';
import { EVMNetwork } from './types/network';

export function getSupportedNetworks():Array<EVMNetwork>{
      return [initialNetworkState];
}


// export type Vault = {
//   vault: string;
//   encryptionKey?: string;
//   encryptionSalt?: string;
// };

// export type NetworkState = {
//   activeNetwork: EVMNetwork;
//   supportedNetworks: Array<EVMNetwork>;
// };



// export const initialState: NetworkState = {
//   activeNetwork: GoerliNetwork,
//   supportedNetworks: [GoerliNetwork],
// };

