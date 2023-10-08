import { hexlify, toUtf8Bytes, toUtf8String } from 'ethers/lib/utils.js';
import { HexString } from '../types/common';
import MainServiceManager from '../services/main';
import {
  Action,
  AsyncThunk,
  AsyncThunkAction,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
  Dispatch,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// Below, we use `any` to deal with the fact that allAliases is a heterogeneous
// collection of async thunk actions whose payload types have little in common
// with each other.
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A list of all webext-redux aliases that have been registered globally. These
 * are generally updated automatically by helpers like
 * `createBackgroundAsyncThunk` and should rarely need to be touched directly.
 *
 * webext-redux aliases are actions that are only run in the background script,
 * but can be invoked with a payload in UI and other scripts. Their type and
 * payload is relayed to the background, and the background uses an enriched
 * action creator to turn them into the final intent. They are primarily used
 * for more complex actions that require middleware to process, such as thunks.
 *
 * @see {@link createBackgroundAsyncThunk} for an example use.
 */
export const allAliases: Record<
  string,
  (action: {
    type: string;
    payload: any;
  }) => AsyncThunkAction<unknown, unknown, any>
> = {};
/* eslint-enable @typescript-eslint/no-explicit-any */

// All props of an AsyncThunk.
type AsyncThunkProps = keyof AsyncThunk<
  unknown,
  unknown,
  Record<string, unknown>
>;

type AsyncThunkConfig = {
  state?: unknown;
  dispatch?: Dispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

// The type system will make sure we've listed all additional props that redux
// toolkit adds to the AsyncThunk action creator below.
//
// The approach is a bit ugly, but the goal here is transparent usage wrt
// createAsyncThunk, and this allows ensuring that any future upgrades don't
// break expectations without breaking the compile.
type ExhaustivePropList<PropListType, TargetType> =
  PropListType extends readonly (infer T)[]
  ? keyof TargetType extends T
  ? readonly T[]
  : never
  : never;
const asyncThunkProperties = (() => {
  const temp = ['typePrefix', 'pending', 'rejected', 'fulfilled'] as const;

  const exhaustiveList: ExhaustivePropList<
    typeof temp,
    AsyncThunk<unknown, unknown, Record<string, unknown>>
  > = temp;

  return exhaustiveList;
})();


/**
 * Encode an unknown input as JSON, special-casing bigints and undefined.
 *
 * @param input an object, array, or primitive to encode as JSON
 */
export function encodeJSON(input: unknown): string {
  return JSON.stringify(input, (_, value) => {
    if (typeof value === 'bigint') {
      return { B_I_G_I_N_T: value.toString() };
    }
    return value;
  });
}

/**
 * Decode a JSON string, as encoded by `encodeJSON`, including bigint support.
 * Note that the functions aren't invertible, as `encodeJSON` discards
 * `undefined`.
 *
 * @param input a string output from `encodeJSON`
 */
export function decodeJSON(input: string): unknown {
  return JSON.parse(input, (_, value) =>
    value !== null && typeof value === 'object' && 'B_I_G_I_N_T' in value
      ? BigInt(value.B_I_G_I_N_T)
      : value
  );
}

/**
 * Returns a 0x-prefixed hexadecimal representation of a number or string chainID
 * while also handling cases where an already hexlified chainID is passed in.
 */
export function toHexChainID(chainID: string | number): string {
  if (typeof chainID === 'string' && chainID.startsWith('0x')) {
    return chainID.toLowerCase();
  }
  return `0x${BigInt(chainID).toString(16)}`;
}

export function createBackgroundAsyncThunk<
  TypePrefix extends string,
  Returned,
  ThunkArg = void,
  ThunkApiConfig extends AsyncThunkConfig = {
    extra: { mainServiceManager: MainServiceManager };
  }
>(
  typePrefix: TypePrefix,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
  options?: AsyncThunkOptions<ThunkArg, ThunkApiConfig>
): ((payload: ThunkArg) => Action<TypePrefix> & { payload: ThunkArg }) &
  Pick<AsyncThunk<Returned, ThunkArg, ThunkApiConfig>, AsyncThunkProps> {
  // Exit early if this type prefix is already aliased for handling in the
  // background script.
  if (allAliases[typePrefix]) {
    throw new Error('Attempted to register an alias twice.');
  }

  // Use reduxtools' createAsyncThunk to build the infrastructure.
  const baseThunkActionCreator = createAsyncThunk(
    typePrefix,
    async (...args: Parameters<typeof payloadCreator>) => {
      try {
        return await payloadCreator(...args);
      } catch (error) {
        console.error('Async thunk failed', error);
        throw error;
      }
    },
    options
  );

  // Wrap the top-level action creator to make it compatible with webext-redux.
  const webextActionCreator = Object.assign(
    (payload: ThunkArg) => ({
      type: typePrefix,
      payload,
    }),
    // Copy the utility props on the redux-tools version to our version.
    Object.fromEntries(
      asyncThunkProperties.map((prop) => [prop, baseThunkActionCreator[prop]])
    ) as Pick<AsyncThunk<Returned, ThunkArg, ThunkApiConfig>, AsyncThunkProps>
  );

  // Register the alias to ensure it will always get proxied back to the
  // background script, where we will run our proxy action creator to fire off
  // the thunk correctly.
  allAliases[typePrefix] = (action: { type: string; payload: ThunkArg }) =>
    baseThunkActionCreator(action.payload);

  return webextActionCreator;
}