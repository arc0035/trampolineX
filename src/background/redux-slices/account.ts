import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { DomainName, HexString, URI } from '../types/common';
import { EVMNetwork } from '../types/network';
import { AccountBalance } from '../types/account';
import KeyringService from '../services/keyring';
import { RootState } from './index';
import { Dispatch } from 'react';
import MainServiceManager from '../services/main';
import { resetKeyRings } from './keyrings';

export type AccountData = {
  address: HexString;
  network: EVMNetwork;
  accountDeployed: boolean;
  minimumRequiredFunds: string;
  balances?: {
    [assetSymbol: string]: AccountBalance;
  };
  ens?: {
    name?: DomainName;
    avatarURL?: URI;
  };
};

type AccountsByChainID = {
  [chainID: string]: {
    [address: string]: AccountData | 'loading';
  };
};

export interface AccountState {
  account?: HexString;
  accountAdded: HexString | null;
  hasAccountError?: boolean;
  accountsData: {
    info: {
      [address: string]: {
        name: string;
      };
    };
    evm: AccountsByChainID;
  };
  accountApiCallResult?: any;
  accountApiCallResultState?: 'awaiting' | 'set';
}

const initialState = {
  accountsData: { evm: {}, info: {} },
  accountAdded: null,
  combinedData: {
    totalMainCurrencyValue: '',
    assets: [],
  },
} as AccountState;

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccountAdded: (state): AccountState => ({
      ...state,
      accountAdded: null,
    }),
    addNewAccount: (
      state,
      {
        payload,
      }: {
        payload: {
          name: string;
          makeActive: boolean;
          chainIds: Array<string>;
          address: string;
        };
      }
    ): AccountState => ({
      ...state,
      account: payload.makeActive ? payload.address : state.account,
      accountAdded: payload.address,
      accountsData: {
        info: {
          ...state.accountsData.info,
          [payload.address]: {
            name: payload.name,
          },
        },
        evm: {
          ...state.accountsData.evm,
          ...payload.chainIds.reduce(
            (result: AccountsByChainID, chainId: string) => {
              result[chainId] = {
                [payload.address]: 'loading',
              };
              return result;
            },
            {}
          ),
        },
      },
    }),
    setAccountApiCallResult: (
      state: AccountState,
      { payload }: { payload: any }
    ) => ({
      ...state,
      accountApiCallResult: payload,
    }),
    setAccountApiCallResultState: (
      state: AccountState,
      { payload }: { payload: 'awaiting' | 'set' }
    ) => ({
      ...state,
      accountApiCallResultState: payload,
    }),
    setAccountData: (
      state: AccountState,
      {
        payload,
      }: {
        payload: AccountData;
      }
    ): AccountState => ({
      ...state,
      accountsData: {
        ...state.accountsData,
        evm: {
          ...state.accountsData.evm,
          [payload.network.chainID]: {
            [payload.address]: payload,
          },
        },
      },
    }),
    resetAccount: (state)=>(
      {...initialState}
    )
  },
});

export const { addNewAccount, resetAccountAdded, setAccountData, resetAccount } =
  accountSlice.actions;
export default accountSlice.reducer;

export const getAccountData = 
  async (address:string, apiContext: {dispatch: Dispatch<AnyAction>, mainServiceManager: MainServiceManager})=>{
      //1. Params preparations
      const mainServiceManager: MainServiceManager = apiContext.mainServiceManager;
      const keyringService = mainServiceManager.getService(KeyringService.name) as KeyringService;
      const activeNetwork = (mainServiceManager.store.getState() as RootState).network.activeNetwork;
      
      //2. Load account banalce & code info from blockchain 
      const accountData = await keyringService.getAccountData(address, activeNetwork);

      //3. set to state
      const dispatch = apiContext.dispatch;
      dispatch(setAccountData({
        minimumRequiredFunds: accountData.minimumRequiredFunds,
        address: address,
        network: activeNetwork,
        accountDeployed: accountData.accountDeployed,
        balances: accountData.balances
      }));
  }

export const resetAccountApi = (address: string, apiContext:{dispatch:Dispatch<AnyAction>})=>{
  const dispatch = apiContext.dispatch;
  dispatch(resetAccount());
  dispatch(resetKeyRings());
  
};
// export const callAccountApiThunk = createBackgroundAsyncThunk(
//   'account/callAccountApiThunk',
//   async (
//     {
//       address,
//       functionName,
//       args,s
//     }: { address: string; functionName: string; args?: any[] },
//     { dispatch, extra: { mainServiceManager } }
//   ) => {
//     dispatch(accountSlice.actions.setAccountApiCallResultState('awaiting'));

//     const keyringService = mainServiceManager.getService(
//       KeyringService.name
//     ) as KeyringService;

//     const result = await keyringService.callAccountApi(
//       address,
//       functionName,
//       args
//     );

//     dispatch(accountSlice.actions.setAccountApiCallResult(result));
//     dispatch(accountSlice.actions.setAccountApiCallResultState('set'));
//   }
// );
