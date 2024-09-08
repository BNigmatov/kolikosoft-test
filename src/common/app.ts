import { ItemsRouter } from '../routers/items.router.js';
import { ItemService } from '../services/items/item.service.js';
import { ExpressApplicationBase } from './app.base.js';
// routers

export class Application extends ExpressApplicationBase {
    protected override async initServices(): Promise<void> {
        super.initServices();
    }
    protected override async initRouters(): Promise<void> {
        await super.initRouters();
        const apiRoot = this.appConfig.httpServer.apiRoot;
        this.server.setHandler(apiRoot + 'items',
            new ItemsRouter(this,
                new ItemService(),
            ),
        );
    }
    protected override async internalStop(): Promise<void> {
        await super.internalStop();
    }
}
