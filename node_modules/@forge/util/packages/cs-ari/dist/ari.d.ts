import * as AppFamilyAriModule from './app-family-ari';
/**
 * ARI - an Atlassian Resource Identifier used within connect to describe installation contexts.
 *
 * an implementation of https://product-fabric.atlassian.net/wiki/display/PRODUCT/Atlassian+Resource+Identifier
 */
export interface Ari {
    readonly resourceOwner: string;
    readonly cloudId?: string;
    readonly resourceType?: string;
    readonly resourceId?: string;
    toString: () => string;
    toJSON: () => string;
    equals: (other: any) => boolean;
    contains: (other: Ari) => boolean;
    urlEncode: () => string;
    urlDecode: () => string;
}
export interface AppFamilyAriOperations<J extends AppFamilyAriJson> {
    toAri(): Ari;
    toString(): string;
    toJSON(): J;
    isAppAri(): this is AppAri;
    asAppAri(): AppAri;
    isAppEnvironmentAri(): this is AppEnvironmentAri;
    asAppEnvironmentAri(): AppEnvironmentAri;
    isAppEnvironmentVersionAri(): this is AppEnvironmentVersionAri;
    asAppEnvironmentVersionAri(): AppEnvironmentVersionAri;
    isExtensionGroupAri(): this is ExtensionGroupAri;
    asExtensionGroupAri(): ExtensionGroupAri;
    isExtensionAri(): this is ExtensionAri;
    asExtensionAri(): ExtensionAri;
}
export interface AppAriJson {
    appId: string;
}
export interface AppEnvironmentAriJson extends AppAriJson {
    environmentId: string;
    version?: string;
}
export interface AppEnvironmentVersionAriJson extends AppEnvironmentAriJson {
    versionId: string;
}
export interface ExtensionGroupAriJson extends AppEnvironmentAriJson {
    extensionGroupId: string | 'static';
}
export interface ExtensionAriJson extends ExtensionGroupAriJson {
    extensionKey: string;
}
export interface AppAri extends AppAriJson, AppFamilyAriOperations<AppAriJson> {
}
export interface AppEnvironmentAri extends AppEnvironmentAriJson, AppFamilyAriOperations<AppEnvironmentAriJson> {
}
export interface AppEnvironmentVersionAri extends AppEnvironmentVersionAriJson, AppFamilyAriOperations<AppEnvironmentVersionAriJson> {
}
export interface ExtensionGroupAri extends ExtensionGroupAriJson, AppFamilyAriOperations<ExtensionGroupAriJson> {
}
export interface ExtensionAri extends ExtensionAriJson, AppFamilyAriOperations<ExtensionAriJson> {
}
export declare type AppFamilyAriJson = AppAriJson | AppEnvironmentAriJson | AppEnvironmentVersionAriJson | ExtensionGroupAriJson | ExtensionAriJson;
export declare type AppFamilyAri = AppAri | AppEnvironmentAri | AppEnvironmentVersionAri | ExtensionGroupAri | ExtensionAri;
export declare class AppFamilyAriError extends Error {
    readonly cause?: Error | undefined;
    constructor(message: string, cause?: Error | undefined);
}
export declare class NotAppFamilyAriError extends AppFamilyAriError {
    readonly reason: string;
    constructor(ari: Ari, reason: string);
}
export declare class NotExpectedAppFamilyAriTypeError extends AppFamilyAriError {
    readonly cause?: Error | undefined;
    constructor(type: AppFamilyAriModule.AppFamilyResourceType, ari: AppFamilyAri, cause?: Error | undefined);
}
//# sourceMappingURL=ari.d.ts.map