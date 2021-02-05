import * as express from 'express';
import registerRouter from './register';

const router = express.Router();

router.use('/register', registerRouter);

export default router; 

//links individual endpoints