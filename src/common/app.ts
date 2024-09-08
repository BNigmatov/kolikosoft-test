import { ExpressApplicationBase } from './app.base.js';
// routers

export class Application extends ExpressApplicationBase {
    protected override async initServices(): Promise<void> {
        super.initServices();
    }
    protected override async initRouters(): Promise<void> {
        await super.initRouters();
    }
    protected override async internalStop(): Promise<void> {
        await super.internalStop();
    }
}
