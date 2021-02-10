import { Router } from 'express'; //don't need to import all from express; just router
import apiRouter from './api'; //connects api and auth routers
import authRouter from './auth';

const router = Router() //save express middleware router in a variable we can import and export

router.use('/api', apiRouter); //api used for data and info
router.use('/auth', authRouter); //auth for authentication and workflow

export default router;

//index our two diverging routers at the two routing files