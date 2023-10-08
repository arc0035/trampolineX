import AccountApi from '../../ext/account-api';
import { AccountImplementationType } from '../types/account-api/types';

const ActiveAccountImplementation: string = 'active';

const AccountImplementation: AccountImplementationType = AccountApi;

const AccountImplementations: {
  [name: string]: AccountImplementationType;
} = {
  [ActiveAccountImplementation]: AccountImplementation,
};

export const PROVIDER_BRIDGE_TARGET = 'aa-extension-provider-bridge';
export const WINDOW_PROVIDER_TARGET = 'aa-extension-window-provider';
export const EXTERNAL_PORT_NAME = 'aa-extension-external';


export { ActiveAccountImplementation, AccountImplementations };
