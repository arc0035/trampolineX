


// import {
//   AccountImplementations,
//   ActiveAccountImplementation
// } from './constants';
// import { ethers } from 'ethers';

// export async function createNewAccount(    {
//     name,
//     implementation,
//     context,
//     chainIds,
//   }: {
//     name: string;
//     chainIds: Array<string>;
//     implementation: string;
//     context?: any;
//   },) {
//     //创建AccountAPI对象
//     const account = new AccountImplementations[implementation]({
//       provider: this.provider,
//       bundler: this.bundler!,
//       entryPointAddress: this.entryPointAddress,
//       context,
//       paymasterAPI: this.paymasterAPI,
//     });
//     //init的功能是预计算account合约地址
//     await account.init();
//     const address = await account.getAccountAddress();
//     if (address === ethers.constants.AddressZero)
//       throw new Error(
//         `EntryPoint getAccountAddress returned error and returned address ${ethers.constants.AddressZero}, check factory contract is properly deployed.`
//       );
//     this.keyrings[address] = account;
//     await this.persistAllKeyrings();
//     return account.getAccountAddress();
// }

// export async function resetAccountAdded() {
  
// }


