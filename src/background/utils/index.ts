import { hexlify, toUtf8Bytes, toUtf8String } from 'ethers/lib/utils.js';
import { HexString } from '../types/common';


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
