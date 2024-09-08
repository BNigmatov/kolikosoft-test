import { caching } from 'cache-manager';

import { ItemService } from './item.service.js';
import { Item } from './item.type.js';

// @see this: https://docs.skinport.com/?shell#items `Endpoint is cached by 5 minutes`.
const ttl = 5 * 1000 * 60;

// * actually it can be a singleton to handle multiple services, but there is no such requirement, XX и в продакшен
const memoryCache = await caching('memory', {
    max: 100,
    ttl,
});
const key = 'items_' + Date.now();

export class CachBasedItemService extends ItemService {
    override async getAll(): Promise<Item[]> {
        return memoryCache.wrap(key, () => super.getAll());
    }
}
