import { middleware } from 'express-openapi-validator';
import { IApplication } from '../types/common.type.js';

import { BaseRouter } from './base.router.js';

interface Config {
    file: string;
}
export class ApiDocRouter extends BaseRouter<Config> {
    constructor(_app: IApplication, config: Config) {
        super(_app, config);
    }
    protected override init(config: Config): void {
        this._router.use(
            middleware({
                apiSpec: config.file,
            }),
        );
    }
}
