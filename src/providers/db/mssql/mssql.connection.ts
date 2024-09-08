import _sql, { config as Config, ConnectionPool } from 'mssql';
import { IDBConnectionManager } from '../../../types/db.type.js';
import { ConfigError, INVALID_CONFIG } from '../../../types/error.type.js';

const ERROR_EMPTY_SERVER = 'EDBEMPTYSERVER';
const ERROR_EMPTY_DBNAME = 'EDBEMPTYDBNAME';

const DEF_CONFIG: Config = {
    server: '',
    pool: {
        min: 2,
        max: 5,
        idleTimeoutMillis: 60000,
    },
    options: {
        encrypt: false,
        useUTC: false, // default true
        enableArithAbort: true,
    },
};

class MSSQLConnectionManager implements IDBConnectionManager {
    private __pool: ConnectionPool;
    constructor(config: Partial<Config> = {}) {
        const { options, pool, ...base } = config;
        const currentConfig = { ...DEF_CONFIG, ...base };
        currentConfig.options = { ...DEF_CONFIG.options, ...options };
        currentConfig.pool = { ...DEF_CONFIG.pool, ...pool };
        this.validateConfig(currentConfig);
        this.__pool = new _sql.ConnectionPool(currentConfig);
    }
    async getConnection(): Promise<_sql.ConnectionPool> {
        if (!this.__pool.connected) {
            await this.__pool.connect();
        }
        return this.__pool;
    }
    disconnect(): Promise<void> {
        return this.__pool.close();
    }
    private validateConfig(config: Config): void {
        if (!config.server) {
            throw new ConfigError(INVALID_CONFIG, ERROR_EMPTY_SERVER);
        }
        if (!config.database) {
            throw new ConfigError(INVALID_CONFIG, ERROR_EMPTY_DBNAME);
        }
    }
}

export default MSSQLConnectionManager;
