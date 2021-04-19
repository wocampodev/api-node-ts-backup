import express, { Application } from 'express';
import { loadControllers, scopePerRequest } from 'awilix-express';
import cors from 'cors';

import container from '../core/Container';

export default class Server {

    private static _instance: Server;

    public app: Application;
    private port: string;

    private constructor() {
        this.app = express();
        this.port = process.env.APP_SERVER_PORT || '8000';

        this.middlewares();
    }

    public static get instance(): Server {
        return this._instance || ( this._instance = new this() );
    }

    middlewares(): void {
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use( scopePerRequest( container() ) );
        this.app.use( loadControllers(
            'controllers/*.js',
            { cwd: `${__dirname}/../` }
        ));
    }

    listen(): void {
        this.app.listen( this.port );
    }

}