import { AppFamilyAri, AppFamilyAriJson, AppFamilyAriOperations, Ari } from './ari';
/**
 * throws NotAppFamilyAriError if not a valid app family ari
 */
export declare function parseAppAri(ari: Ari): AppFamilyAri;
export declare function createAppAri<J extends AppFamilyAriJson>(json: J): J & AppFamilyAriOperations<J>;
//# sourceMappingURL=app-aris.d.ts.map