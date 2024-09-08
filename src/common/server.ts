import express from 'express';
import path from 'path';

import http from 'http';

import { IServer, IApplication, PathParams, IRouter } from '../types/common.type.js';
import { Request, Response, NextFunction } from 'express';
import { errorToRemoteAPIError, IRemoteAPIErrorBasic } from '../types/error.type.js';
import { ConfigError, DEFAULT_ERROR_STATUS, IError } from '../types/error.type.js';

interface Config {
    port: number;
    apiRoot: string;
    apiSpec?: {
        file: string;
        /**
         * apispec endpoint path for swagger, default: `/api/spec`
         *
         * @type {(boolean | string)}
         */
        publish?: boolean | string;
        useValidator?: boolean;
    };
    /**
     * root path for static resources, default(for `static===true)` is `/public`
     *
     * @type {(boolean | string)}
     */
    static?: boolean | string;
    limit?: string | number;
}

const ERROR_NO_VALID_PORT_SPECIFIED = 'Port is not configured properly';

export default class ExpressServer implements IServer {
    private httpServer: http.Server | undefined;
    private httpApp = express();
    root = path.resolve('.');

    constructor(private _app: IApplication, private config: Config) {
        this.init();
        this.initMiddleware(config);
    }

    setHandler(routerPath: PathParams, router: IRouter): void {
        if (routerPath) {
            this.httpApp.use(routerPath, router.handler);
        }
        else {
            this.httpApp.use(router.handler);
        }
    }

    sendError(res: Response, status: number, error: IRemoteAPIErrorBasic): void {
        // * avoid ERR_HTTP_INVALID_STATUS_CODE, @see: `res.status(status)` below
        if (status < 100 || status > 999) {
            error.detail.more ||= [];
            error.detail.more.push({ status });
            status = DEFAULT_ERROR_STATUS;
        }
        //
        this.logByErrorStatus(status, { error });
        // TODO: Hide remote server IP, port on `ECONNREFUSED`, `ENOTFOUND` status code = 502
        if ('production' === this._app.mode) {
            delete (error.detail.stack);
        }
        // if no accept header, 1st method will be performed (json in our case)
        res.format(
            {
                'json': () => res.status(status).send({ error }),
                'html': () => {
                    let page = '';
                    switch (status) {
                        // codes having their own page
                        case 404:
                            page = '404.html';
                            break;
                        case 500:
                        case 501:
                        case 502:
                        case 503:
                            page = '500.html';
                            break;
                        default:
                            page = '404.html';
                            break;
                    }
                    res.status(status).sendFile(`${this.root}/public/page/${page}`);
                },
                'text/*': () => res.status(status).send({ error }),
                'default': () => res.status(status).type('text').send(error.message),
            },
        );
    }

    async start(): Promise<void> {
        return new Promise((resolve, reject) => {
            const port = this.config.port;
            if (isNaN(port)) {
                reject(new ConfigError(ERROR_NO_VALID_PORT_SPECIFIED));
            }
            this.setErrorHandler();
            this.httpServer = this.httpApp.listen(port, () => { resolve(); });
        });
    }
    async stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            // https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
            this.httpServer?.close((err?: Error) => {
                this.httpServer = undefined;
                if (err) { reject(err); }
                else { resolve(); };
            });
        });
    }
    private init() {
        this.httpApp.disable('x-powered-by'); // disable X-Powered-By header
    }
    private initMiddleware(config: Config) {
        const limit = config.limit;
        this.httpApp.use(express.json({ limit })); // Content-Type: application/json
        this.httpApp.use(express.urlencoded({ extended: true, limit })); // Content-Type: application/x-www-form-urlencoded
        // this.httpApp.use(cookieParser(this._app.env.SESSION_SECRET));
        if (config.static) {
            const folder = (typeof config.static === 'boolean') ? 'public' : config.static;
            this.httpApp.use(express.static(`${this.root}/${folder}`));
        }
        // * for swagger only {{baseUrl}}/api/spec
        if (config.apiSpec?.publish) {
            const { file, publish } = config.apiSpec;
            const endpoint = (typeof publish === 'boolean') ? 'spec' : publish;
            this.httpApp.use(`/api/${endpoint}`, express.static(file));
        }
    }

    private logByErrorStatus(status: number, obj: Record<string, unknown>) {
        if (!this._app.logger) {
            return;
        }
        const logData = { status, ...obj };
        switch (status) {
            case 500:
            case 501:
            case 502:
            case 503:
            case 400:
            case 401:
            case 403:
            case 405:
            case 406:
            case 413:
            case 415:
            case 422:
                this._app.logger.error(logData);
                break;
            case 404:
            case 409:
            case 410:
                this._app.logger.warn(logData);
                break;
            default:
                this._app.logger.info(logData);
                break;
        }
    }

    private setErrorHandler() {
        const errorHandler = (error: IError, req: Request, res: Response, _next: NextFunction) => {
            const apiError = errorToRemoteAPIError(error);
            apiError.detail.host = req.hostname;
            apiError.detail.path = req.originalUrl;
            apiError.detail.method = req.method;
            this.sendError(res, error.status || DEFAULT_ERROR_STATUS, apiError);
        };
        this.httpApp.use(errorHandler);
    }
}
