import { HexString } from './common';
import { AddressOnNetwork, EVMNetwork } from './network';

export type Vault = {
  vault: string;
  encryptionKey?: string;
  encryptionSalt?: string;
};

export type NetworkState = {
  activeNetwork: EVMNetwork;
  supportedNetworks: Array<EVMNetwork>;
};

export type EIP712DomainType = {
  name?: string;
  version?: string;
  chainId?: number | string;
  verifyingContract?: HexString;
};

export interface TypedDataField {
  name: string;
  type: string;
}

export type EIP712TypedData<T = Record<string, unknown>> = {
  domain: EIP712DomainType;
  types: Record<string, TypedDataField[]>;
  message: T;
  primaryType: string;
};

export type SignTypedDataRequest = {
  account: AddressOnNetwork;
  typedData: EIP712TypedData;
};

export type EIP2612SignTypedDataAnnotation = {
  type: 'EIP-2612';
  source: string;
  displayFields: {
    owner: string;
    tokenContract: string;
    spender: string;
    value: string;
    nonce: number;
    expiry: string;
    token?: string;
  };
};

export type SignTypedDataAnnotation = EIP2612SignTypedDataAnnotation;

export type EnrichedSignTypedDataRequest = SignTypedDataRequest & {
  annotation?: SignTypedDataAnnotation;
};

export type EIP191Data = string;

// spec found https://eips.ethereum.org/EIPS/eip-4361
export interface EIP4361Data {
  /**
   * The message string that was parsed to produce this EIP-4361 data.
   */
  unparsedMessageData: string;
  domain: string;
  address: string;
  version: string;
  chainId: number;
  nonce: string;
  expiration?: string;
  statement?: string;
}

type EIP191SigningData = {
  messageType: 'eip191';
  signingData: EIP191Data;
};

type EIP4361SigningData = {
  messageType: 'eip4361';
  signingData: EIP4361Data;
};

export type MessageSigningData = EIP191SigningData | EIP4361SigningData;

export type MessageSigningRequest<
  T extends MessageSigningData = MessageSigningData
> = T & {
  origin: string;
  account: AddressOnNetwork;
  rawSigningData: string;
};

type SigningState = {
  signedTypedData: string | undefined;
  typedDataRequest: EnrichedSignTypedDataRequest | undefined;

  signedData: string | undefined;
  signDataRequest: MessageSigningRequest | undefined;
};

export const initialState: SigningState = {
  typedDataRequest: undefined,
  signedTypedData: undefined,

  signedData: undefined,
  signDataRequest: undefined,
};
