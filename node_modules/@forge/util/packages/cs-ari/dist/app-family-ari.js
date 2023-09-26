"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appFamilyResourceTypes = exports.isAppFamilyResourceType = exports.extensionResourceType = exports.extensionGroupResourceType = exports.appEnvironmentVersionResourceType = exports.environmentResourceType = exports.appResourceType = exports.resourceOwner = void 0;
exports.resourceOwner = 'ecosystem';
exports.appResourceType = 'app';
exports.environmentResourceType = 'environment';
exports.appEnvironmentVersionResourceType = 'app-environment-version';
exports.extensionGroupResourceType = 'extension-group';
exports.extensionResourceType = 'extension';
const isAppFamilyResourceType = function (type) {
    switch (type) {
        case exports.resourceOwner:
        case exports.appResourceType:
        case exports.environmentResourceType:
        case exports.appEnvironmentVersionResourceType:
        case exports.extensionGroupResourceType:
        case exports.extensionResourceType:
            return true;
    }
    return false;
};
exports.isAppFamilyResourceType = isAppFamilyResourceType;
exports.appFamilyResourceTypes = [
    exports.appResourceType,
    exports.environmentResourceType,
    exports.appEnvironmentVersionResourceType,
    exports.extensionGroupResourceType,
    exports.extensionResourceType,
];
//# sourceMappingURL=app-family-ari.js.map