import { config as ConnectionConfig } from 'mssql';
import { IDBConnectionManager, IDBRepository, IDBRequest } from '../../../types/db.type.js';
import MSSQLConnectionManager from './mssql.connection.js';
import { IQueryStorage } from './mssql.querystorage.js';
import MSSQLRequest from './mssql.request.js';

interface Config {
    queries: IQueryStorage;
    connection?: ConnectionConfig;
}
class MSSQLRepository implements IDBRepository {
    readonly connectionManager: IDBConnectionManager;
    readonly request: IDBRequest;

    constructor(readonly config: Config) {
        this.connectionManager = new MSSQLConnectionManager(config.connection);
        this.request = new MSSQLRequest(this);
    }
    disconnect(): Promise<void> {
        return this.connectionManager.disconnect();
    }
}

export default MSSQLRepository;
