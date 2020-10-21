import mongoose from 'mongoose';
import { Mongo } from 'node-config-ts';
import { Logger } from 'winston';

class ManageDB {
  private config;

  private logger;

  constructor({ config, logger }: { config: Mongo; logger: Logger }) {
    this.config = config;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    let credentials = '';

    if (
      this.config.credentials &&
      this.config.credentials.user &&
      this.config.credentials.password
    ) {
      credentials = `${this.config.credentials.user}:${this.config.credentials.password}@`;
    }

    const connection =
      typeof this.config === 'string'
        ? this.config
        : `mongodb://${credentials}${this.config.host}:${this.config.port}/${this.config.database}?authSource=admin`;

    // const options = this.config.ENV == 'prod' ? { autoIndex: false } : {};

    this.logger.debug('Connecting to the database...');

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    // mongoose.set('debug', true);

    await mongoose
      .connect(connection, { useNewUrlParser: true })
      .catch(error => {
        this.logger.error('Error while connecting to the database', error);
        throw error;
      });

    this.logger.debug('Connected to the database');
  }

  async close(): Promise<void> {
    this.logger.debug('Closing database...');

    await mongoose.connection.close().catch(error => {
      this.logger.error('Error while closing the database', error);
      throw error;
    });

    this.logger.debug('Database closed');
  }
}

export default ManageDB;
