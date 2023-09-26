"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppAri = exports.parseAppAri = void 0;
const app_ari_impls_1 = require("./app-ari-impls");
/**
 * throws NotAppFamilyAriError if not a valid app family ari
 */
function parseAppAri(ari) {
    return app_ari_impls_1.AppFamilyAriImpl.parse(ari);
}
exports.parseAppAri = parseAppAri;
function createAppAri(json) {
    return new app_ari_impls_1.AppFamilyAriImpl(json);
}
exports.createAppAri = createAppAri;
//# sourceMappingURL=app-aris.js.map