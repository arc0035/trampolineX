import AccountApi from '../../ext/account-api';
// import { AccountImplementationType } from '../../ext/account-api/types';
import { AccountImplementationType } from '../types/account-api/types';


const AccountImplementation: AccountImplementationType = AccountApi;
const ActiveAccountImplementation = 'active';

const AccountImplementations: {
  [name: string]: AccountImplementationType;
} = {
  [ActiveAccountImplementation]: AccountImplementation,
};

export const PROVIDER_BRIDGE_TARGET = 'aa-extension-provider-bridge';
export const WINDOW_PROVIDER_TARGET = 'aa-extension-window-provider';
export const EXTERNAL_PORT_NAME = 'aa-extension-external';

export const AA_EXTENSION_CONFIG = 'aa-extension_getConfig';

export { ActiveAccountImplementation, AccountImplementations };
