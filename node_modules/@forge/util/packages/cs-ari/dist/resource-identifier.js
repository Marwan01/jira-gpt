"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceIdentifier = exports.InvalidAriError = void 0;
const constraints_1 = require("./constraints");
/**
 * InvalidAriError - an error thrown if an invalid Ari is constructed
 */
class InvalidAriError extends Error {
    /**
     * Construct an InvalidAriError given an error message
     *
     * @param {string} ariString - the ARI that failed to parse
     * @param {string|undefined} description - The error message
     */
    constructor(ariString, description) {
        super(`Invalid ari string: ${ariString}${description ? '. ' + description : ''}`);
        this.ariString = ariString;
        // Support correct inheritance in ES5
        Object.setPrototypeOf(this, InvalidAriError.prototype);
    }
    /**
     * Construct an InvalidAriError given some constraint violations
     *
     * @param {string} ariString - the ARI that failed to parse
     * @param {ConstraintViolation<Object>[]} violations - The array of constraint errors
     */
    static withConstraintViolations(ariString, violations) {
        return new InvalidAriError(ariString, violations.map((v) => v.toString()).join('\n'));
    }
}
exports.InvalidAriError = InvalidAriError;
function matchesSegment(value1, value2) {
    if (value1 === value2) {
        return true;
    }
    else if (value1 === undefined) {
        return true;
    }
    return false;
}
// constraints are based on draft of v2 spec https://hello.atlassian.net/wiki/spaces/ARCH/pages/161909310/Atlassian+Resource+Identifier+Spec+draft-2.0#AtlassianResourceIdentifierSpec(draft-2.0)-Syntax
const basicCharConstraint = (0, constraints_1.pattern)(/^[a-z][a-z.-]*$/);
/**
 * resourceType allows for capitalized letters to support Identity ARIs (`ari:cloud:identity::userGrant/<...>`)
 * It's a violation of the spec, but we still need to support that.
 * See https://hello.atlassian.net/wiki/spaces/ARCH/pages/161909310/Atlassian+Resource+Identifier+Spec+draft-2.0
 */
const resourceTypeCharConstraints = (0, constraints_1.pattern)(/^[a-z][a-z.-]*$/i);
const resourceOwnerConstraints = [(0, constraints_1.lengthBetween)(3, 255), basicCharConstraint];
const resourceTypeConstraints = [(0, constraints_1.lengthBetween)(3, 255), resourceTypeCharConstraints];
const cloudIdConstraints = [(0, constraints_1.lengthBetween)(3, 255)];
const siteResourceType = 'site';
const resourceIdChars = /[\w-._~:@#]/.source;
const resourceIdConstraints = [
    (0, constraints_1.pattern)(new RegExp(`^${resourceIdChars}+(/${resourceIdChars}*)*(;v=${resourceIdChars}*)*$`)),
];
/**
 * Returns an Ari that is of the latest version of the Ari spec that we support. Any legacy formats
 * (like those for site wide ARIs) are upgraded to their latest form.
 */
function upgrade(values) {
    const { resourceId, resourceOwner, cloudId } = values;
    // note: The new ARI spec has not defined a format for system wide contexts so we exclude them from upgrade
    if (!resourceId && cloudId) {
        return {
            resourceOwner,
            resourceType: siteResourceType,
            resourceId: cloudId,
        };
    }
    else {
        return values;
    }
}
class ResourceIdentifier {
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
    constructor(values) {
        const { resourceId, resourceOwner, resourceType, cloudId } = upgrade(values);
        this.resourceOwner = resourceOwner;
        this.internalCloudId = cloudId;
        this.resourceType = resourceType;
        this.resourceId = resourceId;
        this.validate();
    }
    get cloudId() {
        if (this.resourceType === siteResourceType) {
            return this.internalCloudId ? this.internalCloudId : this.resourceId;
        }
        return this.internalCloudId;
    }
    /**
     * Parse a string as an Ari
     *
     * @param {string} ariString - the string to parse
     * @returns {Ari} the parsed ari
     * @throws {InvalidAriError} if the string could not be correctly parsed as an Ari.
     */
    static parse(ariString) {
        if (!ariString) {
            throw new InvalidAriError(ariString);
        }
        const match = new RegExp(/^ari:cloud:([^:/]+):([^:/]*):([^:/]*)\/(.*)$/).exec(ariString);
        if (!match || match.length !== 5) {
            throw new InvalidAriError(ariString);
        }
        const terms = match.map((a) => (a && a.length > 0 ? a : undefined));
        const resourceOwner = terms[1];
        if (!resourceOwner) {
            throw new InvalidAriError(ariString);
        }
        return new ResourceIdentifier({
            resourceOwner: resourceOwner,
            cloudId: terms[2],
            resourceType: terms[3],
            resourceId: terms[4],
        });
    }
    static parseEncoded(encodedAriString) {
        return ResourceIdentifier.parse(decodeURIComponent(encodedAriString));
    }
    /**
     * Converts this Ari to a string.
     */
    toString() {
        if (!this.ariString) {
            const resourceId = this.resourceType === siteResourceType && this.internalCloudId ? this.internalCloudId : this.resourceId || '';
            const resourceType = this.resourceType || '';
            const sanitizedCloudId = this.resourceType === siteResourceType ? '' : this.internalCloudId || '';
            this.ariString = `ari:cloud:${this.resourceOwner}:${sanitizedCloudId}:${resourceType}/${resourceId}`;
        }
        return this.ariString;
    }
    /**
     * Converts this object to its json representation
     */
    toJSON() {
        return this.toString();
    }
    /**
     * Checks if this context is the same as another context
     *
     * @param {Ari} other - the other parameter to match with
     * @returns {boolean} - true if all segments of both Aris are equal, false otherwise
     */
    equals(other) {
        return (other instanceof ResourceIdentifier &&
            this.resourceOwner === other.resourceOwner &&
            this.cloudId === other.cloudId &&
            this.resourceType === other.resourceType &&
            this.resourceId === other.resourceId);
    }
    /**
     * This method checks if the current context contains the other context.
     *
     * Note: it does that by transforming a site context  (e.g. `ari:cloud:<resource owner>:site/<cloud id>`)
     * if required to an "any" resource type context (e.g. `ari:cloud:<resource owner>:<cloud id>:/`)
     *
     * @param {Ari} other
     * @returns {boolean}
     */
    contains(other) {
        return this.matches(new ResourceIdentifier(other));
    }
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
    matches(other) {
        return (matchesSegment(this.resourceOwner, other.resourceOwner) &&
            matchesSegment(this.cloudId, other.cloudId) &&
            ((this.resourceType === siteResourceType && !!other.resourceType) ||
                matchesSegment(this.resourceType, other.resourceType)) &&
            ((this.resourceType === siteResourceType && !!other.resourceType) ||
                matchesSegment(this.resourceId, other.resourceId)));
    }
    validateSiteWide() {
        const { resourceType, cloudId } = this;
        if (resourceType === siteResourceType && !cloudId) {
            return new constraints_1.GeneralValidationError('site wide ARIs must have a cloudId');
        }
    }
    validate() {
        const constraintViolations = [
            (0, constraints_1.validateField)(this, 'resourceOwner', resourceOwnerConstraints),
            (0, constraints_1.validateField)(this, 'resourceType', resourceTypeConstraints),
            (0, constraints_1.validateField)(this, 'resourceId', resourceIdConstraints),
            (0, constraints_1.validateField)(this, 'cloudId', cloudIdConstraints),
            this.validateSiteWide(),
        ].filter((v) => v);
        if (constraintViolations.length > 0) {
            throw InvalidAriError.withConstraintViolations(this.toString(), constraintViolations);
        }
        if (this.resourceId !== undefined && this.resourceType === undefined) {
            throw new InvalidAriError(this.toString(), 'The resource type must be specified if the resource id is defined.');
        }
    }
    urlEncode() {
        return encodeURIComponent(this.toString());
    }
    urlDecode() {
        return decodeURIComponent(this.toString());
    }
}
exports.ResourceIdentifier = ResourceIdentifier;
//# sourceMappingURL=resource-identifier.js.map