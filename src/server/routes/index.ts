import { Router } from 'express';
import apiRouter from './api';
import authRouter from './auth';

const router = Router()

router.use('/api', apiRouter);
router.use('/auth', authRouter);

export default router;

//index our two diverging routers at the two routing files