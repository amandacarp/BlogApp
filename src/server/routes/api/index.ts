import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import authorsRouter from './authors';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);
router.use('/authors', authorsRouter);

export default router; 