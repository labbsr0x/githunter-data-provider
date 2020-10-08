import { Router } from 'express';

import { ICodeInfoModel } from '../database/models/Code';
import CodeInfoRepository from '../database/repositories/CodeInfoRepository';

const codeInfoRouter = Router();
const codeInfoRepository = new CodeInfoRepository();

codeInfoRouter.get('/', async (request, response) => {
  try {
    const { repoList } = request.body;

    let docs: ICodeInfoModel[] | null;

    if (repoList) {
      docs = await codeInfoRepository.find({ $or: repoList });
    } else {
      docs = await codeInfoRepository.find();
    }

    return response.status(200).json({ repositories: docs });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

codeInfoRouter.post('/', async (request, response) => {
  try {
    const data = request.body;

    let doc: ICodeInfoModel | null;

    if (data) {
      doc = await codeInfoRepository.save(data);
    } else {
      throw new Error('Missing args');
    }

    return response.status(200).json({ data: doc });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default codeInfoRouter;
