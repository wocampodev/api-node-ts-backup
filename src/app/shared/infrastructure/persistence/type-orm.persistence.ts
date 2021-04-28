import path from 'path';

import { Connection, createConnection } from 'typeorm';

export default async function typeOrmConnection(): Promise<Connection | void> {
    const pathEntities = path.join(__dirname, '/../../../../', 'app/**/infrastructure/entities/*.entity.js');
    return await createConnection({
        type: 'mysql',
        port: 3306,
        host: process.env.DB_MYSQL_HOST,
        username: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        entities: [pathEntities],
        // "migrations": [
        //     "src/migration/**/*.ts"
        // ],
        // "subscribers": [
        //     "src/subscriber/**/*.ts"
        // ]
    }).catch(console.error);
}
