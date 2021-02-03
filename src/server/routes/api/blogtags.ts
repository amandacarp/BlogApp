import * as express from 'express';
import db from '../../db'

const router = express.Router();

router.get('/:blogid', async (req, res) => {
    const blogid = Number(req.params.blogid);
    try {
        const blogtags = await db.BlogTags.tags(blogid);
        res.json(blogtags[0]);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    const blogTags = req.body;
    const {blogid, tagid} = blogTags
    try {
        console.log(blogid, tagid);
        const blogTagPost = await db.BlogTags.create(blogid, tagid);
        res.json(blogTagPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;