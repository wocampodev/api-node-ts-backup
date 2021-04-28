import { createPool, Pool } from 'mysql2/promise';

export default (): Pool => {
    return createPool({
        host: process.env.DB_MYSQL_HOST,
        user: process.env.DB_MYSQL_USER,
        password: process.env.DB_MYSQL_PASSWORD,
        database: process.env.DB_MYSQL_DATABASE,
        decimalNumbers: true,
    }) as Pool;
};
