import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Subscriber } from './entities/Subscriber';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: false,
  entities: [Subscriber],
  migrations: [],
  subscribers: [],
});
