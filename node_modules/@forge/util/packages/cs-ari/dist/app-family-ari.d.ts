export declare const resourceOwner = "ecosystem";
export declare const appResourceType = "app";
export declare const environmentResourceType = "environment";
export declare const appEnvironmentVersionResourceType = "app-environment-version";
export declare const extensionGroupResourceType = "extension-group";
export declare const extensionResourceType = "extension";
export declare type AppFamilyResourceType = typeof appResourceType | typeof environmentResourceType | typeof appEnvironmentVersionResourceType | typeof extensionGroupResourceType | typeof extensionResourceType;
export declare const isAppFamilyResourceType: (type: string) => type is AppFamilyResourceType;
export declare const appFamilyResourceTypes: AppFamilyResourceType[];
//# sourceMappingURL=app-family-ari.d.ts.map