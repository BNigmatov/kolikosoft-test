import { Request, Response } from 'express';
import { ERROR_NOTFOUND, IRemoteAPIErrorBasic, NOTFOUND } from '../types/error.type.js';

import { BaseRouter } from './base.router.js';

export class Error404Router extends BaseRouter {
    processError(req: Request, res: Response): void {
        const error: IRemoteAPIErrorBasic = {
            message: NOTFOUND,
            code: ERROR_NOTFOUND,
            type: 'RouterError',
            detail: {
                path: req.url,
                method: req.method,
            },
        };
        this._app.server.sendError(res, 404, error);
    }
    protected init(): void {
        // 404 handler
        this._router.all('*', (req: Request, res: Response) => {
            this.processError(req, res);
        });
    }
}
