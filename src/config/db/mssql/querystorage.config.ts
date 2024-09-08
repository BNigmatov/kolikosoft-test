import { SimpleQueryStorage } from '../../../providers/db/mssql/mssql.querystorage.js';

const queries: ConstructorParameters<typeof SimpleQueryStorage>[0] = {};

export default new SimpleQueryStorage(queries);
