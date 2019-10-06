import { Server } from './server';
import 'reflect-metadata';
import express, { json, urlencoded } from 'express';
import { serverSettings, dbSettings } from './config';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';
import { EventHub } from './core/event-hub';

EventHub.init();

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.send('dadasdads');
});

app.use(router);

const server = new Server(dbSettings);
server.init();

app.listen(serverSettings.PORT, () => {
  console.log(`Listening on port ${serverSettings.PORT}!`);
});

