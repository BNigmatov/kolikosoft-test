import './env.js';
import initLogger from './logger.js';
import { IApplication, ILogger, IServer } from '../types/common.type.js';

import ExpressServer from './server.js';
// routers
import { ApiDocRouter } from '../routers/openapi.router.js';
import { Error404Router } from '../routers/404.router.js';

export interface ApplicationConfig {
    id?: string;
    mode?: string;
    logger?: Parameters<typeof initLogger>[0];
    httpServer: ConstructorParameters<typeof ExpressServer>[1];
    onApplicationStop?(): Promise<void>;
}

export class ExpressApplicationBase implements IApplication {
    get id(): string { return this.appConfig.id ?? ''; }
    get mode() { return this.appConfig.mode === 'production' ? 'production' : 'development'; }
    ready = false;
    server: IServer;
    logger: ILogger;
    env = process.env;
    constructor(protected appConfig: ApplicationConfig) {
        this.logger = initLogger(appConfig.logger);
        this.server = new ExpressServer(this, appConfig.httpServer);
    }
    async start(): Promise<void> {
        return this.server.start();
    }
    async config(): Promise<void> {
        return this.internalConfig();
    }
    async stop(): Promise<void> {
        this.ready = false;
        await this.server.stop();
        await this.internalStop();
        await this.appConfig.onApplicationStop?.();
    }
    protected async internalConfig(): Promise<void> {
        try {
            await this.initProps();
            await this.initServices();
            await this.initRouters();
            // it should be the last router. It perform its action when no other router was executed.
            this.server.setHandler('', new Error404Router(this));
        }
        catch (error) {
            throw error;
        }
    }
    protected async initProps(): Promise<void> { }
    protected async initServices(): Promise<void> { }
    protected async initRouters(): Promise<void> {
        const { file = '', useValidator = false } = this.appConfig.httpServer.apiSpec ?? {};
        if (!useValidator) {
            return;
        }
        // it should be the first router to check is route valid. See api.yml
        this.server.setHandler('', new ApiDocRouter(this, { file }));
    }
    protected async internalStop(): Promise<void> { }
}
