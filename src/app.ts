import 'reflect-metadata';
import express from 'express';
import { serverSettings } from './config';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import router from './router';

const app = express();

app.use(cors);
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(router);

app.listen(serverSettings.PORT, () => {
  console.log(`Listening on port ${serverSettings.PORT}!`);
});
