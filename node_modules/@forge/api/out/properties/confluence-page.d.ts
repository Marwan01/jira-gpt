import { RequestProductMethod } from '../index';
import { ConfluenceVersionedStorage } from './confluence-versioned-storage';
export declare class ConfluencePageStorage extends ConfluenceVersionedStorage {
    constructor(pageId: string, apiClient: RequestProductMethod);
    set(key: string, value: any): Promise<void>;
}
//# sourceMappingURL=confluence-page.d.ts.map