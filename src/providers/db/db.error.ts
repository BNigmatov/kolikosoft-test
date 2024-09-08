export class BadObjectRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadObjectRequestError';
    }
}
