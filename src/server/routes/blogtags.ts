import * as express from 'express';
import db from '../db'

const router = express.Router();

router.get('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);
    try {
        const blogtags = await db.BlogTags.tags(blogid);
        res.json(blogtags);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;