import { Router } from 'express';
import logger from '../config/winston';

import { IUserModel } from '../database/models/User';
import UserRepository from '../database/repositories/UserRepository';

const usersSimpleRouter = Router();
const userRepository = new UserRepository();

usersSimpleRouter.get('/', async (request, response) => {
  try {
    const { provider, organization } = request.query;

    const docs = await userRepository.find(
      {
        $or: [
          {
            provider: provider ? (provider as string) : new RegExp('.'),
            organizations: organization
              ? (organization as string)
              : new RegExp('.'),
          },
        ],
      },
      'login',
    );

    logger.info(`GET Request for path /usersSimple successfully executed!`);
    return response.status(200).json({ users: docs });
  } catch (err) {
    logger.error(`GET Request for path /usersSimple failure! ${err}`);

    return response.status(400).json({ error: err.message });
  }
});

export default usersSimpleRouter;
