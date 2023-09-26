"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEncoded = exports.parse = void 0;
const resource_identifier_1 = require("./resource-identifier");
__exportStar(require("./ari"), exports);
__exportStar(require("./app-aris"), exports);
__exportStar(require("./resource-identifier"), exports);
/**
 * Parse a string as an Ari
 *
 * @param {string} ariString - the string to parse
 * @returns {Ari} the parsed ari
 * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
 */
function parse(ariString) {
    return resource_identifier_1.ResourceIdentifier.parse(ariString);
}
exports.parse = parse;
/**
 * Parse a URL encoded string as an Ari
 *
 * @param {string} encodedAriString - the string to parse
 * @returns {Ari} the parsed ari
 * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
 */
function parseEncoded(encodedAriString) {
    return resource_identifier_1.ResourceIdentifier.parseEncoded(encodedAriString);
}
exports.parseEncoded = parseEncoded;
//# sourceMappingURL=index.js.map