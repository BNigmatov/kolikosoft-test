import { Item } from './item.type';

export class ItemService {
    async getAll(): Promise<Item[]> {
        throw new Error('[ItemService]: "getAll" method is not implemented');
    }
}
