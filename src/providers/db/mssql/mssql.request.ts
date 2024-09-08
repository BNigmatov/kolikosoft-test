import mssql, { IResult, ConnectionPool, Request } from 'mssql';
// types
import { IDBRequest, IAPIRequest, SimpleDict, TValue } from '../../../types/db.type.js';
import { IQuery, IQueryParam } from './mssql.type.js';

import { constToValue } from '../db.util.js';
import { BadObjectRequestError } from '../db.error.js';
import MSSQLRepository from './mssql.repository.js';

const { TYPES } = mssql;

class MSSQLRequest implements IDBRequest {
    constructor(private _repo: MSSQLRepository) { }

    async get<T>(model: IAPIRequest): Promise<T[]> {
        const query = this.getQuery(model);
        const { params = {} } = model;
        const { recordset } = await this._processRequest<T>({ query, outerParams: params });
        return recordset;
    }
    async one<T>(model: IAPIRequest): Promise<T | null> {
        const items = await this.get<T>(model);
        return items[0] ?? null;
    }
    async post<T>(model: IAPIRequest): Promise<T[]> {
        const query = this.getQuery(model);
        const { params = {} } = model;
        const { output, recordset } = await this._processRequest<T>({ query, outerParams: params });
        // set output parameters values
        model.params = Object.assign(model.params ?? {}, output);
        return recordset;
    }
    private getQuery(model: IAPIRequest): IQuery {
        const name = model.name;
        const query = this._repo.config.queries.getQuery(name);
        if (query.command.trim() === '') {
            throw (new BadObjectRequestError(`Wrong object name ${name}`));
        }
        return query;
    }
    private async _processRequest<T>({ query, outerParams }: { query: IQuery; outerParams?: SimpleDict; }): Promise<IResult<T>> {
        const dbConnection: ConnectionPool = await this._repo.connectionManager.getConnection();
        const request = dbConnection.request();
        if (query.params) {
            this._setParameters(request, query.params, outerParams || {});
        }
        switch (query.method) {
            case 'exec':
                return request.execute<T>(query.command);
            default:
                return request.query<T>(query.command);
        }
    }
    private _setParameters(request: Request, params: IQueryParam[], values: SimpleDict): void {
        params.forEach((param) => {
            let value: TValue;
            // приводим item.name к регистру, т.к. ключи в values приходят в нижнем регистре(см. APIRouter.getData)
            value = values[param.name] ?? values[param.name.toLowerCase()] ?? constToValue(param.defaultValue);
            value = this.adjustValue(value, param);
            if (!!param.output) {
                request.output(param.name, param.dataType, value);
            }
            else {
                request.input(param.name, param.dataType, value);
            }
        });
    }
    private adjustValue(value: TValue, param: IQueryParam): TValue {
        let result = value;
        switch (param.dataType) {
            case TYPES.DateTime:
                if (!(result instanceof Date)) {
                    result = new Date(result);
                }
                result.setMilliseconds(0);
                break;
            case TYPES.Date:
                result = result !== undefined ? new Date(result) : null;
                break;
            default:
                break;
        }
        return result;
    }
}

export default MSSQLRequest;
