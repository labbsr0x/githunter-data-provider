import { Router } from 'express';
import codeInfoRouter from './codeInfo.routes';
import languageRouter from './language.routes';

const routes = Router();

routes.use('/code-info', codeInfoRouter);
routes.use('/language', languageRouter);

export default routes;
