// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT),
    dialect:  process.env.DB_DIALECT
  },
  test: {
    username: process.env.TESTING_DB_USERNAME,
    password: process.env.TESTING_DB_PASSWORD,
    database: process.env.TESTING_DB_NAME,
    host:     process.env.TESTING_DB_HOST,
    port:     parseInt(process.env.TESTING_DB_PORT),
    dialect:  process.env.TESTING_DB_DIALECT
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host:     process.env.PROD_DB_HOST,
    port:     parseInt(process.env.PROD_DB_PORT),
    dialect:  process.env.PROD_DB_DIALECT
  }
};
