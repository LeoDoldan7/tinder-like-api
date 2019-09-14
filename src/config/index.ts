import { config } from 'dotenv';

config();

export const serverSettings = {
  PORT: process.env.PORT
};
