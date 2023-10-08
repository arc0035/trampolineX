import { NetworkState } from "../types/network";
import { TransactionState } from "../types/transaction";

export default class RootState {
    network: NetworkState;
    transactions: TransactionState;

    constructor(network: NetworkState, transactions: TransactionState){
        this.network = network;
        this.transactions = transactions;
    }
}

