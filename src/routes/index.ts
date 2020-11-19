import { Router } from 'express';
import codeInfoRouter from './codeInfo.routes';
import languagesRouter from './languages.routes';

const routes = Router();

routes.use('/code-info', codeInfoRouter);
routes.use('/languages', languagesRouter);

export default routes;
