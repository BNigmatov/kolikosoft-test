import path from 'path';
import { ApplicationConfig } from '../common/app.base.js';

type LoggerConfig = ApplicationConfig['logger'];
type HttpServerConfig = ApplicationConfig['httpServer'];

const TRUE_VALUES = ['1', 'yes', 'true'];

export const loadConfig = async (): Promise<ApplicationConfig> => {
    const id = process.env['APP_ID'];
    const mode = process.env['NODE_ENV'];
    let destination = process.env['LOG_FOLDER'] ?? '';
    if (destination) {
        destination = path.resolve(destination, `${id}.log`);
    }
    const loggerConfig: LoggerConfig = {
        name: id,
        level: process.env['LOG_LEVEL'],
        pretty: TRUE_VALUES.includes(process.env['LOG_PRETTY'] ?? '0'),
        file: {
            destination,
        },
    };
    const httpServerConfig: HttpServerConfig = {
        port: parseInt(process.env['PORT'] || '', 10),
        apiRoot: process.env['ENDPOINT_ROOT'] || '',
        apiSpec: {
            file: path.resolve('./docs/api/v1/api.yaml'),
            publish: true,
            useValidator: true,
        },
        limit: process.env['REQUEST_LIMIT'] ?? '100kb',
    };
    //

    return {
        id,
        mode,
        logger: loggerConfig,
        httpServer: httpServerConfig,
    };
};
