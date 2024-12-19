import { DataSource } from 'typeorm';
import { Activity } from '../entities/Activity';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'db',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'activity_search_db',
    entities: [Activity],
    synchronize: true,
    logging: true,
    logger: 'advanced-console',
    maxQueryExecutionTime: 1000,
    charset: 'utf8mb4',
    extra: {
        connectionLimit: 10
    }
});
