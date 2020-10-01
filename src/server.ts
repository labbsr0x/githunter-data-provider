import express from 'express';
import cors from 'cors';
import { config, Mongo } from 'node-config-ts';

import ManageDB from './database';
import routes from './routes';

const app = express();

const startApp = () => {
  const { port } = config.server;

  app.listen(port, () => {
    console.log(`Server started on localhost: ${port}`);
  });
};

const initRoutes = () => {
  app.use(routes);
};

const configureApp = () => {
  app.use(express.json());
  app.use(cors());
};

const connectDB = () => {
  const mongoConfig: Mongo = config.mongo;

  const database = new ManageDB({ config: mongoConfig, logger: console });
  return database.connect();
};

const run = async () => {
  await connectDB();
  configureApp();
  initRoutes();
  startApp();
};

run();
