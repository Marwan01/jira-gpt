import { Ari } from './ari';
export * from './ari';
export * from './app-aris';
export * from './resource-identifier';
/**
 * Parse a string as an Ari
 *
 * @param {string} ariString - the string to parse
 * @returns {Ari} the parsed ari
 * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
 */
export declare function parse(ariString: string): Ari;
/**
 * Parse a URL encoded string as an Ari
 *
 * @param {string} encodedAriString - the string to parse
 * @returns {Ari} the parsed ari
 * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
 */
export declare function parseEncoded(encodedAriString: string): Ari;
//# sourceMappingURL=index.d.ts.map