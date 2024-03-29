import { Router } from 'express';
import logger from '../config/winston';

import { ICodeInfoModel } from '../database/models/Code';
import { ILanguageModel } from '../database/models/Language';
import CodeInfoRepository from '../database/repositories/CodeInfoRepository';
import LanguageRepository from '../database/repositories/LanguageRepository';

const codeInfoRouter = Router();
const codeInfoRepository = new CodeInfoRepository();
const languageRepositoy = new LanguageRepository();

codeInfoRouter.get('/', async (request, response) => {
  try {
    const { repoList } = request.body;

    let docs: ICodeInfoModel[] | null;

    if (repoList) {
      docs = await codeInfoRepository.find({ $or: repoList });
    } else {
      docs = await codeInfoRepository.find();
    }

    logger.info(`GET Request for path /code-info successfully executed!`);
    return response.status(200).json({ repositories: docs });
  } catch (err) {
    logger.error(`GET Request for path /code-info failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

codeInfoRouter.post('/', async (request, response) => {
  try {
    const data = request.body;

    let doc: ICodeInfoModel | null;

    if (data) {
      doc = await codeInfoRepository.save(data);

      if (doc) {
        doc.languages.forEach(language => {
          const languageDoc = { name: language };
          languageRepositoy.save(languageDoc as ILanguageModel);
        });
      }
    } else {
      throw new Error('Missing args');
    }

    logger.info(`POST Request for path /code-info successfully executed!`);
    return response.status(200).json({ data: doc });
  } catch (err) {
    logger.error(`POST Request for path /code-info failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

export default codeInfoRouter;
