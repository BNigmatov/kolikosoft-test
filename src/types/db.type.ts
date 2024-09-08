// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TValue = any;

interface Dict<T> {
    [key: string]: T | undefined;
}

export type SimpleDict = Dict<TValue>;

export interface IAPIRequest {
    name: string;
    params?: SimpleDict;
}

export interface IDBConnectionManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getConnection(): any;
    disconnect(): Promise<void>;
}
export interface IDBRequest {
    get<T>(model: IAPIRequest): Promise<T[]>;
    one<T>(model: IAPIRequest): Promise<T | null>;
    post<T>(model: IAPIRequest): Promise<T[]>;
}
export interface IDBRepository {
    request: IDBRequest;
    disconnect(): Promise<void>;
}
