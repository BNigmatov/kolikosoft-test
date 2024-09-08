import { IRouter, IHandler, IApplication } from '../types/common.type.js';
import { Router } from 'express';
import { ERROR_EMPTYPARAM, ERROR_INVALIDTYPE, RouterError } from '../types/error.type.js';

export function extractParam<T>(req: Record<string, unknown>, name: string, type: string, required = true): T {
    const { [name]: value } = req;
    if (typeof value === 'undefined' && required) {
        throw new RouterError(`Parameter ${name} is undefined`, ERROR_EMPTYPARAM, 400);
    }
    let isValidType = true;
    let typedValue: unknown = value;
    switch (type) {
        case 'number':
            typedValue = Number(value);
            isValidType = !isNaN(Number(value));
            break;
        case 'boolean':
            typedValue = (value === 'false') ? false : !!value;
            break;
        case 'string':
            isValidType = true;
            break;
        default:
            isValidType = false;
    }
    if (isValidType) {
        return typedValue as T;
    }
    else {
        throw new RouterError(`parameter ${name} is not a ${type}`, ERROR_INVALIDTYPE, 400);
    }
}

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
