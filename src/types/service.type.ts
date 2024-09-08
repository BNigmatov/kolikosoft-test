import { BasicError } from './error.type.js';

export class ServiceError extends BasicError {
    constructor(message: string, code: number | string, status = 500) {
        super(message, code, status);
        this.name = 'ServiceError';
    }
}
