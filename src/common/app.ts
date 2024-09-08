import { ExpressApplicationBase } from './app.base.js';
// routers
import { ItemsRouter } from '../routers/items.router.js';
import { UsersRouter } from '../routers/users.router.js';
// services
import { ItemService } from '../services/items/item.service.js';
import { UserService } from '../services/users/user.service.js';

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
        this.server.setHandler(apiRoot + 'users',
            new UsersRouter(this,
                new UserService(),
            ),
        );
    }
    protected override async internalStop(): Promise<void> {
        await super.internalStop();
    }
}
