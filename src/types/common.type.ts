import { IRemoteAPIErrorBasic } from './error.type.js';

export interface IApplication {
    readonly id: string;
    readonly mode: 'production' | 'development';
    ready: boolean;
    server: IServer;
    logger: ILogger;
    env: Record<string, string | undefined>;
    config(): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export interface IServer {
    root: string;
    setHandler(routerPath: PathParams, router: IRouter): void;
    sendError(res: IResponse, status: number, apiError: IRemoteAPIErrorBasic): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}

export type PathParams = string | RegExp | Array<string | RegExp>;

export interface IRouter {
    handler: IHandler;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type IHandler = any;
export type IResponse = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

// #region logger
interface LogFn {
    (msg: string, ...args: unknown[]): void;
    (obj: unknown, msg?: string, ...args: unknown[]): void;
}

export interface ILogger {
    fatal: LogFn;
    error: LogFn;
    warn: LogFn;
    info: LogFn;
    debug: LogFn;
    trace: LogFn;
}
// #endregion logger
