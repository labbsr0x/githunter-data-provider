import { Router } from 'express';

import codeInfoRouter from './codeInfo.routes';
import languagesRouter from './languages.routes';
import providersRouter from './providers.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/code-info', codeInfoRouter);
routes.use('/languages', languagesRouter);
routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);

export default routes;
