import { Router } from 'express';
import logger from '../config/winston';

import { IUserModel } from '../database/models/User';
import UserRepository from '../database/repositories/UserRepository';

const usersRouter = Router();
const userRepository = new UserRepository();

usersRouter.post('/', async (request, response) => {
  try {
    const data = request.body;

    let doc: IUserModel | null;

    if (data) {
      doc = await userRepository.save(data);
    } else {
      throw new Error('Missing args');
    }

    logger.info(`POST Request for path /users successfully executed!`);

    return response.status(200).json({ data: doc });
  } catch (err) {
    logger.error(`POST Request for path /users failure! ${err}`);

    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
