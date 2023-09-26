"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = exports.pattern = exports.lengthBetween = exports.ConstraintViolation = exports.GeneralValidationError = exports.RegexConstraint = exports.LengthConstraint = void 0;
const ts_is_present_1 = require("ts-is-present");
class LengthConstraint {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    get description() {
        return `length must be between ${this.min} and ${this.max}`;
    }
    isValid(value) {
        return !value || (value.length >= this.min && value.length <= this.max);
    }
}
exports.LengthConstraint = LengthConstraint;
class RegexConstraint {
    constructor(regex) {
        this.regex = regex;
    }
    get description() {
        return `value must match regex ${this.regex.source}`;
    }
    isValid(value) {
        return !value || this.regex.test(value);
    }
}
exports.RegexConstraint = RegexConstraint;
class GeneralValidationError {
    constructor(error) {
        this.error = error;
    }
    toString() {
        return this.error;
    }
}
exports.GeneralValidationError = GeneralValidationError;
class ConstraintViolation {
    constructor(fieldName, value, constraints) {
        this.fieldName = fieldName;
        this.value = value;
        this.constraints = constraints;
    }
    toString() {
        const constraintSummary = this.constraints.map(c => `  - ${c.description}`).join('\n');
        return `'${this.value}' is not a valid value for ${this.fieldName} as it violates the following constraints:\n${constraintSummary}`;
    }
}
exports.ConstraintViolation = ConstraintViolation;
function lengthBetween(min, max) {
    return new LengthConstraint(min, max);
}
exports.lengthBetween = lengthBetween;
function pattern(regex) {
    return new RegexConstraint(regex);
}
exports.pattern = pattern;
function validateField(object, fieldName, constraints) {
    const value = object[fieldName];
    const violatedConstraints = constraints
        .map(c => {
        return c.isValid(value) ? undefined : c;
    })
        .filter(ts_is_present_1.isDefined);
    return violatedConstraints.length > 0
        ? new ConstraintViolation(fieldName, value, violatedConstraints)
        : undefined;
}
exports.validateField = validateField;
//# sourceMappingURL=constraints.js.map