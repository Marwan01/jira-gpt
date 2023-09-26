import { Ari } from './ari';
import { ValidationError } from './constraints';
/**
 * InvalidAriError - an error thrown if an invalid Ari is constructed
 */
export declare class InvalidAriError extends Error {
    readonly ariString: string;
    readonly message: string;
    /**
     * Construct an InvalidAriError given an error message
     *
     * @param {string} ariString - the ARI that failed to parse
     * @param {string|undefined} description - The error message
     */
    constructor(ariString: string, description?: string);
    /**
     * Construct an InvalidAriError given some constraint violations
     *
     * @param {string} ariString - the ARI that failed to parse
     * @param {ConstraintViolation<Object>[]} violations - The array of constraint errors
     */
    static withConstraintViolations(ariString: string, violations: ValidationError[]): InvalidAriError;
}
export declare type AriConstructorType = {
    readonly resourceOwner: string;
    readonly cloudId?: string;
    readonly resourceType?: string;
    readonly resourceId?: string;
};
export declare class ResourceIdentifier implements Ari {
    readonly resourceOwner: string;
    readonly resourceType?: string;
    readonly resourceId?: string;
    private ariString?;
    private readonly internalCloudId?;
    get cloudId(): string | undefined;
    /**
     * Create a new Ari
     *
     * Only the resourceOwner is a required field, any other field can be omitted.
     * Older format types are converted on creation
     *
     * @param {string} values.resourceOwner - the owner of this resource (e.g. hipchat, confluence or jira)
     * @param {string|undefined} values.cloudId - the cloud id for this identifier, defined in AID
     * @param {string|undefined} values.resourceType - the resource type this Ari is associated with (e.g. conversation in hipchat)
     * @param {string|undefined} values.resourceId - a resource identifier, if this is specified the associated resourceType *must* be provided.
     *
     * @throws {InvalidAriError} if the provided segments fail to pass validation
     */
    constructor(values: AriConstructorType);
    /**
     * Parse a string as an Ari
     *
     * @param {string} ariString - the string to parse
     * @returns {Ari} the parsed ari
     * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
     */
    static parse(ariString: string): Ari;
    static parseEncoded(encodedAriString: string): Ari;
    /**
     * Converts this Ari to a string.
     */
    toString(): string;
    /**
     * Converts this object to its json representation
     */
    toJSON(): string;
    /**
     * Checks if this context is the same as another context
     *
     * @param {Ari} other - the other parameter to match with
     * @returns {boolean} - true if all segments of both Aris are equal, false otherwise
     */
    equals(other: unknown): boolean;
    /**
     * This method checks if the current context contains the other context.
     *
     * Note: it does that by transforming a site context  (e.g. `ari:cloud:<resource owner>:site/<cloud id>`)
     * if required to an "any" resource type context (e.g. `ari:cloud:<resource owner>:<cloud id>:/`)
     *
     * @param {Ari} other
     * @returns {boolean}
     */
    contains(other: Ari): boolean;
    /**
     * Checks if this context is the same as or contains the provided context.
     *
     * Undefined segments in this ARI are treated as wildcards for matching purposes, but must exactly
     *  match if they are provided in the `other` Ari - i.e. this method is not commutative.
     *
     * e.g.
     * ```
     * parse('ari:cloud:hipchat::/').contains(parse('ari:cloud:hipchat:cloudid:conversation/blah')) === true
     * parse('ari:cloud:hipchat:cloudid:conversation/blah').contains(parse('ari:cloud:hipchat::/')) === false
     *
     * @param {Ari} other - the other parameter to match with
     * @returns {boolean} true if this Ari is the same as the other Ari, or matches the other Ari. False otherwise.
     */
    private matches;
    private validateSiteWide;
    private validate;
    urlEncode(): string;
    urlDecode(): string;
}
//# sourceMappingURL=resource-identifier.d.ts.map