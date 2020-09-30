import { Router } from 'express';
import codeInfoRouter from './codeInfo.routes';

const routes = Router();

routes.use('/code-info', codeInfoRouter);

export default routes;
