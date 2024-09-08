/* eslint-disable new-cap */ // to suppress error on TYPES.VarChar(...) or smth else
// or change rule `new-cap`, @see "capIsNew" prop */
import mssql from 'mssql';
import { SimpleQueryStorage } from '../../../providers/db/mssql/mssql.querystorage.js';

const { TYPES } = mssql;


const queries: ConstructorParameters<typeof SimpleQueryStorage>[0] = {
    'user.one': {
        command: `SELECT r.id
        , r.name
        , r.balance
        FROM dbo.Users r
        WHERE r.id = @id`,
        params: [
            { name: 'id', dataType: TYPES.Int, defaultValue: 0 },
        ],
    },
    'user.update': {
        command: `UPDATE dbo.Users
        SET balance = ISNULL(@balance, balance)
        WHERE id = @id`,
        params: [
            { name: 'id', dataType: TYPES.Int, defaultValue: 0 },
            { name: 'balance', dataType: TYPES.Numeric, defaultValue: null },
        ],
    },
};

export default new SimpleQueryStorage(queries);
