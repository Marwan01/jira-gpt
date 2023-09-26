"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExpectedAppFamilyAriTypeError = exports.NotAppFamilyAriError = exports.AppFamilyAriError = void 0;
class AppFamilyAriError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
    }
}
exports.AppFamilyAriError = AppFamilyAriError;
class NotAppFamilyAriError extends AppFamilyAriError {
    constructor(ari, reason) {
        super(`ari is not a valid App family ari: ${ari.toString()} as ${reason}`);
        this.reason = reason;
    }
}
exports.NotAppFamilyAriError = NotAppFamilyAriError;
class NotExpectedAppFamilyAriTypeError extends AppFamilyAriError {
    constructor(type, ari, cause) {
        super(`App family ari (${ari.toString()}) is not of expected type: ${type}`, cause);
        this.cause = cause;
    }
}
exports.NotExpectedAppFamilyAriTypeError = NotExpectedAppFamilyAriTypeError;
//# sourceMappingURL=ari.js.map