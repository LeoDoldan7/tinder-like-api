import { config } from 'dotenv';
import { Dialect } from 'sequelize/types';
import { join } from 'path';

config();

export const serverSettings = {
  PORT: process.env.PORT
};

export const authSettings = {
  JWT_SECRET: process.env.JWT_SECRET
};

export const bcryptSettings = {
  SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
};

export const dbSettings = {
  database: process.env.DB_NAME,
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT || '5432'),
  dialect:  process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models:   [join(__dirname, '../', 'database/models/**/*')]
};

console.log(dbSettings);

export const testingDbSettings = {
  database: process.env.TESTING_DB_NAME,
  host:     process.env.TESTING_DB_HOST,
  port:     parseInt(process.env.TESTING_DB_PORT || '5432'),
  dialect:  process.env.TESTING_DB_DIALECT as Dialect,
  username: process.env.TESTING_DB_USERNAME,
  password: process.env.TESTING_DB_PASSWORD
};
