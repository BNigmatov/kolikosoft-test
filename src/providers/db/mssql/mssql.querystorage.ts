import { IQuery } from './mssql.type.js';

export interface IQueryStorage {
    getQuery(name: string): IQuery;
}
interface IQueryList { [name: string]: IQuery; }

const EmptyQuery: IQuery = { method: '', command: '', params: [] };
const defaultQueryMethod = 'select';

/**
* ```js
*    data = {
*        'transaction.save': {
*            command: `insert EDI.[Transactions](providerId, transactionId, documentId, entityId, entryData)
*            values(@providerId, @transactionId, @documentId, 2, @entryDate);
*            set @id = SCOPE_IDENTITY();
*            `,
*            params: [
*                { name: 'providerId', dataType: TYPES.Int, defaultValue: 0 },
*                { name: 'transactionId', dataType: TYPES.VarChar(255), defaultValue: 0 },
*                { name: 'documentId', dataType: TYPES.Int, defaultValue: 0 },
*                { name: 'entryDate', dataType: TYPES.DateTime, subType: 'DateTimeL', defaultValue: 'today',  },
*                { name: 'id', dataType: TYPES.Int, defaultValue: 0, output: true },
*            ],
*        },
*    }
```
 */
export class SimpleQueryStorage implements IQueryStorage {
    constructor(private data: IQueryList) { }
    getQuery(name: string): IQuery {
        const query = this.data[name];
        if (query) {
            const { command = '', method = defaultQueryMethod, params = [] } = query;
            return { command, method, params };
        }
        else {
            return { ...EmptyQuery, params: [] };
        }
    }
}
