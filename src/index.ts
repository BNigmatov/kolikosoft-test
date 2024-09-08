import { Application } from './common/app.js';
import { loadConfig } from './config/application.config.js';
import { hostname } from 'os';

async function bootstrap(): Promise<Application> {
    const config = await loadConfig();
    const app = new Application(config);
    await app.config();
    await app.start();
    app.logger?.info(
        `${app.id} running in ${app.mode} mode at @:${hostname()} on port: ${config.httpServer.port}}`,
    );
    return app;
}

const errorHandler: ((reason: unknown) => void) = (reason) => {
    // eslint-disable-next-line no-console
    console.error('\x1b[40m%s\x1b[0m\x1b[41m%s\x1b[0m', 'Application failed at config:\n', reason);
    process.exit();
};

const terminateApplicationAndExit = async (app: Application, event: string) => {
    app.logger?.error(`${event} event received`);
    await app.stop();
    process.exit();
};

process.on('unhandledRejection', errorHandler);

bootstrap()
    .then((app: Application) => {
        process.on('SIGTERM', async () => {
            await terminateApplicationAndExit(app, 'SIGTERM');
        });
        process.on('SIGINT', async () => {
            await terminateApplicationAndExit(app, 'SIGINT');
        });
        // this only works for *fork* mode
        process.on('message', async (msg: unknown, _sendHandle: unknown) => {
            if (msg === 'shutdown') {
                await terminateApplicationAndExit(app, '"shutdown" message');
            }
        });
        return app;
    })
    .then((app: Application) => {
        process.send?.('ready');
        app.ready = true;
    })
    .catch(errorHandler);
