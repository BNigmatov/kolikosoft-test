export interface IError extends Error {
    code?: number | string;
    status?: number;
    errors?: unknown[];
}
export class BasicError extends Error implements IError {
    code: number | string;
    status: number;
    errors: unknown[] = [];
    constructor(message: string, code: number | string, status = 500) {
        super(message);
        // see: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget
        Object.setPrototypeOf(this, new.target.prototype);
        // ! this doesn't work in production. we get uglyfied class name after webpack optimization was applied
        // * So we have to set class name manually in each descendantes if we want to keep original class name
        // this.name = new.target.name;
        this.name = 'BasicError';
        //
        this.code = code;
        this.status = status;
    }
    addDetailError(error: unknown): this {
        // * this is something like a `cause` in ESNext
        this.errors.push(error);
        return this;
    }
}

export class ConfigError extends BasicError {
    constructor(message: string, code: number | string = 'EBADCONFIG', status = 500) {
        super(message, code, status);
        this.name = 'ConfigError';
    }
}

export class HttpError extends BasicError {
    constructor(message: string, code: number | string, status = 500) {
        super(message, code, status);
        this.name = 'HttpError';
    }
}

export class RouterError extends HttpError {
    constructor(message: string, code: number | string, status = 500) {
        super(message, code, status);
        this.name = 'RouterError';
    }
}

export const NOTFOUND = 'Not found';
export const TYPE_UNKNOWN = 'UnknownError';
export const INVALID_CONFIG = 'Invalid config';

export const ERROR_UNKNOWN = 'EUNKNOWN';
export const ERROR_NOTFOUND = 'ENOTFOUND';
export const ERROR_EMPTYPARAM = 'EEMPTYPARAM';
export const ERROR_INVALIDTYPE = 'EINVALIDTYPE';

export const DEFAULT_ERROR_STATUS = 500;

export interface IRemoteAPIErrorDetail {
    host?: string;
    path?: string;
    method?: string;
    more?: unknown[];
    stack?: string;
}

export interface IRemoteAPIErrorBasic {
    message: string;
    code: string | number;
    type: string;
    detail: IRemoteAPIErrorDetail;
}
export function isBasicAPIError(error: unknown): error is IRemoteAPIErrorBasic {
    if (typeof error !== 'object') { return false; }
    const obj = error as IRemoteAPIErrorBasic;
    return !!(obj.message !== undefined && obj.code !== undefined && obj.type !== undefined);
}

export function errorToRemoteAPIError(source: IError): IRemoteAPIErrorBasic {
    return {
        message: source.message,
        code: source.code || ERROR_UNKNOWN,
        type: source.name,
        detail: {
            more: source.errors,
            stack: source.stack,
        },
    };
}
