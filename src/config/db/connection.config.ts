export const loadConfig = async (appName: string) => {
    return {
        user: process.env['DB_USER_NAME'],
        password: process.env['DB_USER_PWD'],
        server: process.env['DB_SERVER'] || '',
        // * for mssql: if port is NaN then 1433 will be used `this.config.port = this.config.port || 1433`
        port: Number(process.env['DB_PORT']),
        database: process.env['DB_DATABASE'] || '',
        options: {
            appName,
        },
    };
};
