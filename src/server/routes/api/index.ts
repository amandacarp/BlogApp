import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import authorsRouter from './authors';
import commentsRouter from './comments';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);
router.use('/authors', authorsRouter);
router.use('/comments', commentsRouter);

export default router; 