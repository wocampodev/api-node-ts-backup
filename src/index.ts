// tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --module commonjs --allowJs true --noImplicitAny true
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';

import Server from "./core/Server";

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});

const server = Server.instance;
    
server.listen();