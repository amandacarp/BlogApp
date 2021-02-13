import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import authorsRouter from './authors';
import commentsRouter from './comments';
import donateRouter from './donate';
import contactRouter from './contact';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);
router.use('/authors', authorsRouter);
router.use('/comments', commentsRouter);
router.use('/donate', donateRouter);
router.use('/contact', contactRouter);

export default router; 