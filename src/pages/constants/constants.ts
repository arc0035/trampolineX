import Onboarding from '../../ext/onboarding';
import {
  PreTransactionConfirmation,
  TransactionConfirmation,
  PostTransactionConfirmation,
} from '../../ext/transaction';
import SignMessage from '../../ext/sign-message';
import { AccountImplementationComponentsType } from '../../background/types/component';


const AccountImplementation: AccountImplementationComponentsType = {
  Onboarding,
  Transaction: {
    PreTransactionConfirmation,
    TransactionConfirmation,
    PostTransactionConfirmation,
  },
  SignMessage,
};

const AccountImplementations: {
  [name: string]: AccountImplementationComponentsType;
} = {
  active: AccountImplementation,
};

const ActiveAccountImplementation = 'active';
export { ActiveAccountImplementation, AccountImplementations };
