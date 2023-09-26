import { AppAri, AppAriJson, AppEnvironmentAri, AppEnvironmentAriJson, AppEnvironmentVersionAri, AppEnvironmentVersionAriJson, AppFamilyAriJson, AppFamilyAriOperations, Ari, ExtensionAri, ExtensionAriJson, ExtensionGroupAri, ExtensionGroupAriJson } from './ari';
export declare class AppFamilyAriImpl<J extends AppFamilyAriJson> implements AppAriJson, Partial<AppEnvironmentAriJson>, Partial<AppEnvironmentVersionAriJson>, Partial<ExtensionGroupAriJson>, Partial<ExtensionAriJson>, AppFamilyAriOperations<J> {
    private readonly json;
    constructor(json: J);
    get appId(): string;
    get environmentId(): string | undefined;
    get versionId(): string | undefined;
    get version(): string | undefined;
    get extensionGroupId(): string | undefined;
    get extensionKey(): string | undefined;
    toJSON(): J;
    static parse<J extends AppFamilyAriJson>(ari: Ari): AppFamilyAriImpl<J>;
    asAppAri(): AppAri;
    asAppEnvironmentAri(): AppEnvironmentAri;
    asAppEnvironmentVersionAri(): AppEnvironmentVersionAri;
    asExtensionGroupAri(): ExtensionGroupAri;
    asExtensionAri(): ExtensionAri;
    isAppAri(): this is AppAri;
    isAppEnvironmentAri(): this is AppEnvironmentAri;
    isAppEnvironmentVersionAri(): this is AppEnvironmentVersionAri;
    isExtensionGroupAri(): this is ExtensionGroupAri;
    isExtensionAri(): this is ExtensionAri;
    private returnIf;
    private get isAtLeastAppEnvironmentAri();
    private get isAtLeastAppEnvironmentVersionAri();
    private get isAtLeastExtensionGroupAri();
    private validate;
    toAri(): Ari;
    toString(): string;
}
//# sourceMappingURL=app-ari-impls.d.ts.map