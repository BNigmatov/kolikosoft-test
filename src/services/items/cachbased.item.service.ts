
import { memoryCache } from '../../common/cachemanager.js';
import { ItemService } from './item.service.js';
import { Item } from './item.type.js';

// @see this: https://docs.skinport.com/?shell#items `Endpoint is cached by 5 minutes`.
const TTL = 5 * 60 * 1000;

const key = 'items_' + Date.now();

export class CachBasedItemService extends ItemService {
    override async getAll(): Promise<Item[]> {
        return memoryCache.wrap(key, () => super.getAll(), TTL);
    }
}
