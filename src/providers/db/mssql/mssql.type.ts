import { TValue } from '../../../types/db.type.js';
import { ISqlType } from 'mssql';

export interface IQueryParam {
    name: string;
    dataType: (() => ISqlType) | ISqlType;
    defaultValue: TValue;
    output?: boolean;
}
export interface IQuery {
    command: string;
    method?: 'select' | 'exec' | '';
    params?: Array<IQueryParam>;
}
