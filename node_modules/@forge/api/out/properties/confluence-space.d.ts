import { RequestProductMethod } from '../index';
import { ConfluenceVersionedStorage } from './confluence-versioned-storage';
export declare class ConfluenceSpaceStorage extends ConfluenceVersionedStorage {
    constructor(spaceId: string, apiClient: RequestProductMethod);
    set(key: string, value: any): Promise<void>;
}
//# sourceMappingURL=confluence-space.d.ts.map