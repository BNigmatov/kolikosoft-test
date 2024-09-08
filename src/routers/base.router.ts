import { IRouter, IHandler, IApplication } from '../types/common.type.js';
import { Router } from 'express';

export class BaseRouter<T = Record<string, never>> implements IRouter {
    protected _router: Router;

    get handler(): IHandler {
        return this._router;
    }

    constructor(protected _app: IApplication, config?: T) {
        // eslint-disable-next-line new-cap
        this._router = Router();
        this.init(config);
    }

    protected init(_config?: T): void { }
}
