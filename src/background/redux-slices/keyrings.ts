import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { Keyring,KeyringMetadata } from '../types/keyrings';
import KeyringService from '../services/keyring';
import { addNewAccount } from './account';
import { createBackgroundAsyncThunk } from '../utils';
import MainServiceManager from '../services/main';
import { Dispatch } from 'react';
export type Vault = {
  vault: string;
  encryptionKey?: string;
  encryptionSalt?: string;
};

export type KeyringsState = {
  keyrings: Keyring[];
  keyringMetadata: {
    [keyringId: string]: KeyringMetadata;
  };
  importing: false | 'pending' | 'done';
  status: 'locked' | 'unlocked' | 'uninitialized';
  vault: Vault;
  keyringToVerify: {
    id: string;
    mnemonic: string[];
  } | null;
};


export const initialState: KeyringsState = {
  keyrings: [],
  keyringMetadata: {},

  vault: {
    vault:
      '{"data":"Ukexw7sD847Dj98jjvGP+USD","iv":"+X2ZjepqanEDFIJneBDHcw==","salt":"LWHFdiZSZwESRu0M5vBaeLIBwszt8zclfbUH4h8tWFU="}',
    encryptionKey:
      '{"alg":"A256GCM","ext":true,"k":"SnGTN4MUv2Ugv7wy_dGvb-Tmz-CKNnMYbyBHIfUbYJg","key_ops":["encrypt","decrypt"],"kty":"oct"}',
    encryptionSalt: 'LWHFdiZSZwESRu0M5vBaeLIBwszt8zclfbUH4h8tWFU=',
  },
  importing: false,
  status: 'uninitialized',
  keyringToVerify: null,
};

const keyringsSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    keyringLocked: (state) => ({
      ...state,
      status: state.status !== 'uninitialized' ? 'locked' : 'uninitialized',
      vault: {
        vault: state.vault.vault,
      },
    }),
    keyringUnlocked: (state) => ({ ...state, status: 'unlocked' }),
    vaultUpdate: (
      state,
      {
        payload: vault,
      }: {
        payload: Vault;
      }
    ) => ({
      ...state,
      vault,
      status:
        !vault.encryptionKey && state.status !== 'uninitialized'
          ? 'locked'
          : state.status,
    }),
  },
});

export const { keyringLocked, vaultUpdate, keyringUnlocked } =
  keyringsSlice.actions;
export default keyringsSlice.reducer;

/**
 * -------------------------------
 * Background Actions
 * -------------------------------
 */

export const initializeKeyring = createBackgroundAsyncThunk(
  'keyring/initialize',
  async (password: string, { dispatch, extra: { mainServiceManager } }) => {
    const keyringService = mainServiceManager.getService(
      KeyringService.name
    ) as KeyringService;
    await keyringService.createPassword(password);
  }
);

export const createNewAccount =   async (
  {
    name,
    implementation,
    context,
    chainIds,
  }: {
    name: string;
    chainIds: Array<string>;
    implementation: string;
    context?: any
  },
  apiContext:{
    mainServiceManager:MainServiceManager,
    dispatch: Dispatch<AnyAction>
  }
  )=>{
    console.log('hi');
    //     console.log('createNewAccount thunk');

    const keyringService = apiContext.mainServiceManager.getService(
      KeyringService.name
    ) as KeyringService;
      console.log(keyringService);
    const address = await keyringService.addAccount(implementation, context);
    console.log(address)
    apiContext.dispatch(
      addNewAccount({
        name,
        makeActive: true,
        chainIds: chainIds,
        address: address,
      })
    );
  }

// export const createNewAccount = createBackgroundAsyncThunk(
//   'keyring/createNewAccount',
//   async (
//     {
//       name,
//       implementation,
//       context,
//       chainIds,
//     }: {
//       name: string;
//       chainIds: Array<string>;
//       implementation: string;
//       context?: any;
//     },
//     { dispatch, extra: { mainServiceManager } }
//   ) => {
//     console.log('createNewAccount thunk');
//     const keyringService = mainServiceManager.getService(
//       KeyringService.name
//     ) as KeyringService;

//     const address = await keyringService.addAccount(implementation, context);
//     console.log(address)
//     dispatch(
//       addNewAccount({
//         name,
//         makeActive: true,
//         chainIds: chainIds,
//         address: address,
//       })
//     );
//   }
// );
