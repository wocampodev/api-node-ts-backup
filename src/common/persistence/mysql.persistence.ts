import { createPool } from 'mysql2/promise';

export default () => {
    return createPool({
        host: process.env['DB_MYSQL_HOST'],
        user: process.env['DB_MYSQL_USER'],
        password: process.env['DB_MYSQL_PASSWORD'],
        database: process.env['DB_MYSQL_DATABASE'],
        decimalNumbers: true
    });
};