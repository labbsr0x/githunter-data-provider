import { Router } from 'express';
import logger from '../config/winston';

import { IProviderModel } from '../database/models/Provider';
import ProviderRepository from '../database/repositories/ProviderRepository';

const providersRouter = Router();
const providerRepository = new ProviderRepository();

providersRouter.get('/', async (request, response) => {
  try {
    const { providerList } = request.body;

    let docs: IProviderModel[] | null;

    if (providerList) {
      docs = await providerRepository.find({ $or: providerList });
    } else {
      docs = await providerRepository.find();
    }

    logger.info(`GET Request for path /providers successfully executed!`);
    return response.status(200).json({ providers: docs });
  } catch (err) {
    logger.error(`GET Request for path /providers failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

providersRouter.post('/', async (request, response) => {
  try {
    const data = request.body;

    let doc: IProviderModel | null;

    if (data) {
      doc = await providerRepository.save(data);
    } else {
      throw new Error('Missing args');
    }

    logger.info(`POST Request for path /providers successfully executed!`);
    return response.status(200).json({ data: doc });
  } catch (err) {
    logger.error(`POST Request for path /providers failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

export default providersRouter;
