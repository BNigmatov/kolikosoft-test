import { Request, Response, NextFunction } from 'express';
import { IApplication } from '../types/common.type.js';
import { BaseRouter } from './base.router.js';
import { ItemService } from '../services/items/item.service.js';

export class ItemsRouter extends BaseRouter {
    constructor(app: IApplication, private service: ItemService) {
        super(app);
    }
    protected override init(): void {
        this._router.get('', async (_req: Request, res: Response, next: NextFunction) => {
            try {
                const items = await this.service.getAll();
                res.status(200).json(items);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
