import { EthersTransactionRequest } from "./services/types";
import { UserOperationStruct } from '@account-abstraction/contracts';

export type TransactionState = {
    transactionRequest?: EthersTransactionRequest;
    transactionsRequest?: EthersTransactionRequest[];
    modifiedTransactionRequest?: EthersTransactionRequest;
  
    requestOrigin?: string;
    userOperationRequest?: Partial<UserOperationStruct>;
    unsignedUserOperation?: UserOperationStruct;
  };
  