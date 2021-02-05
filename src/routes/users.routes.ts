import { Router } from 'express';
import logger from '../config/winston';

import { IUserModel } from '../database/models/User';
import UserRepository from '../database/repositories/UserRepository';

const usersRouter = Router();
const userRepository = new UserRepository();

usersRouter.get('/', async (request, response) => {
  try {
    const { provider, organization } = request.query;

    const docs = await userRepository.find({
      $or: [
        {
          provider: provider ? (provider as string) : new RegExp('.'),
          organizations: organization
            ? (organization as string)
            : new RegExp('.'),
        },
      ],
    });

    logger.info(`GET Request for path /users successfully executed!`);
    return response.status(200).json({ users: docs });
  } catch (err) {
    logger.error(`GET Request for path /users failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/:login', async (request, response) => {
  try {
    const { login } = request.params;

    const doc = await userRepository.find({ login });

    logger.info(`GET Request for path /users successfully executed!`);
    return response.status(200).json({ doc });
  } catch (err) {
    logger.error(`GET Request for path /users failure! ${err}`);
    return response.status(400).json({ error: err.message });
  }
});

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

    return response.status(200).json({ doc });
  } catch (err) {
    logger.error(`POST Request for path /users failure! ${err}`);

    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
