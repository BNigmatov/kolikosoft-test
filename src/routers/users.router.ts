import { Request, Response, NextFunction } from 'express';
import { IApplication } from '../types/common.type.js';
import { BaseRouter, extractParam } from './base.router.js';
import { UserService } from '../services/users/user.service.js';

export class UsersRouter extends BaseRouter {
    constructor(app: IApplication, private service: UserService) {
        super(app);
    }
    protected override init(): void {
        this._router.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userId: number = extractParam(req.params, 'id', 'number');
                const amount: number = extractParam(req.body, 'amount', 'number');
                await this.service.updateBalance(userId, amount);
                res.status(200).json();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
