import { Item } from './item.type';

export class ItemService {
    async getAll(): Promise<Item[]> {
        // ! Warning: не понятно требование
        // > где помимо прочего должны быть указаны две минимальные цены на предмет (одна цена — tradable, другая — нет)
        // * Что значит *tradable цена* ?
        // возможно имелись ввиду какие-то танцы с *tradable* `in: path` параметром внешнего API
        // smth like
        /*
         const [a, b] = Promise.all([this.itemsFromRemoteAPI(), this.itemsFromRemoteAPI(true)]);
         и дальше агрегация из 2-х массивов(немаленьких), чтобы не попасть в `O(n2)`
         но лучше писать так, чтобы не приходилось гадать
        */
        return this.itemsFromRemoteAPI(true);
    }
    private async itemsFromRemoteAPI(tradableOnly = false): Promise<Item[]> {
        /*
        If true, it shows only tradable items on the market (Default false)
        */
        return fetch(`https://api.skinport.com/v1/items?tradable=${tradableOnly}`, {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((resp) => resp.json() as Promise<Item[]>);
    }
}
