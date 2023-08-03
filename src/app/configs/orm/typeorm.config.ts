import { User } from '../../entities/User';

export const typeOrmConfig = {
  type: 'mongodb',
  url: 'mongodb://localhost:27017/testdb',
  synchronize: true,
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: []
};