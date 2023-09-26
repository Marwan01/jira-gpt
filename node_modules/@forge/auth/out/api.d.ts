import { PermissionCheck } from './types';
export declare const createApiMethods: <T extends Record<string, string>>(methodToPermissionMap: T, permissionCheckFactory: (perm: string) => PermissionCheck) => Record<string, PermissionCheck>;
//# sourceMappingURL=api.d.ts.map