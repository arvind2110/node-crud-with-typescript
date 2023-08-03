import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { getDatabaseConnUrl, getDatabaseType } from '../utils/utils';

const AppDataSource = new DataSource({
  type: getDatabaseType(),
  url: getDatabaseConnUrl(),
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: []
});

AppDataSource.initialize()
  .then(() => {
    console.log(process.env.DB_TYPE);
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
