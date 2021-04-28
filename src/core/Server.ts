import path from 'path';

import express, { Application } from 'express';
import cors from 'cors';
import { loadControllers, scopePerRequest } from 'awilix-express';

import container from '../core/Container';

class Server {
    private static _instance: Server;

    private app: Application;
    private port: string;

    private constructor() {
        this.app = express();
        this.port = process.env.APP_SERVER_PORT;
        this.configurate();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this());
    }

    configurate(): void {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(scopePerRequest(container()));
        this.app.use(
            loadControllers('app/**/infrastructure/controllers/*.js', {
                cwd: path.join(__dirname, '/../'),
            })
        );
    }

    listen(): void {
        this.app.listen(this.port);
    }
}

export default Server;
