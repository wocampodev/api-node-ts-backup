// tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --module commonjs --allowJs true --noImplicitAny true
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import pathServer from 'path';
import dotenv from 'dotenv';

import Server from "./core/Server";

const path = pathServer.join( __dirname, '/../config/', `${process.env.APP_ENV}.env` );
dotenv.config({ path });

const server = Server.instance;
    
server.listen();