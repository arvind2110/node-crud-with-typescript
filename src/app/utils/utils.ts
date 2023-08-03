import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appConfig from '../configs/app.config';
import i18next from 'i18next';

export const generateHashedValue = async (value: string): Promise<string> => {
  return await bcrypt.hash(value, appConfig.salt.length);
};

export const compareHashedValue = async (value: string, hashedValue: string): Promise<boolean> => {
  return await bcrypt.compare(value, hashedValue);
};

export const getPayloadFromToken =  (value: string): unknown => {
  const tempArray = value.split(' ');
  const decoded = jwt.decode(tempArray[1], {complete: true});
  return decoded?.payload;
};

export const getTranslation = (key: string, lang: string = 'en') => {
  return i18next.t(key, { lang });
};

export const getDatabaseType = () => {
  const DB_TYPE: 'mongodb' = 'mongodb'; // TODO : To be fixed
  return DB_TYPE;
};

export const getDatabaseConnUrl = (): string => {
  const DB_TYPE: string = (typeof (process.env.DB_TYPE) === 'string') ? `${process.env.DB_TYPE}` : 'mongodb';
  const DB_HOST: string = (typeof (process.env.DB_HOST) === 'string') ? `${process.env.DB_HOST}` : 'localhost';
  const DB_NAME: string = (typeof (process.env.DB_NAME) === 'string') ? `${process.env.DB_NAME}` : 'devdb';
  const DB_PORT: string = (typeof (process.env.DB_PORT) === 'string') ? `${process.env.DB_PORT}` : '27017';

  const DB_CONN_URL: string = `${DB_TYPE}://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  return DB_CONN_URL;
};
