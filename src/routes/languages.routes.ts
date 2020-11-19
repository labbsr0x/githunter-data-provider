import { Router } from 'express';
import logger from '../config/winston';

import { ILanguageModel } from '../database/models/Language';
import LanguageRepository from '../database/repositories/LanguageRepository';

const languagesRouter = Router();
const languageRepository = new LanguageRepository();

languagesRouter.get('/', async (request, response) => {
  try {
    const { languageList } = request.body;

    let docs: ILanguageModel[] | null;
    const results: ILanguageModel[] = [];

    if (languageList) {
      docs = await languageRepository.find({ $or: languageList });
    } else {
      docs = await languageRepository.find();
    }

    if (docs) {
      docs.forEach(doc => {
        const unique = docs?.filter(
          filtered => doc.name === filtered.name,
        )[0] as ILanguageModel;

        if (!results.some(result => result === unique)) {
          results.push(unique);
        }
      });
    }

    logger.info(`GET Request for path /language successfully executed!`);
    return response.status(200).json({ languages: results });
  } catch (err) {
    logger.error(`GET Request for path /language failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

languagesRouter.post('/', async (request, response) => {
  try {
    const data = request.body;

    let doc: ILanguageModel | null;

    if (data) {
      doc = await languageRepository.save(data);
    } else {
      throw new Error('Missing args');
    }

    logger.info(`POST Request for path /language successfully executed!`);
    return response.status(200).json({ data: doc });
  } catch (err) {
    logger.error(`POST Request for path /language failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

export default languagesRouter;
