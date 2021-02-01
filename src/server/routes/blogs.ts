import * as express from 'express';
import db from '../db'

const router = express.Router();


router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = id ? await db.Blogs.by_id(id) : await db.Blogs.all();
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.Blogs.delete_blog(id)
        res.json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;
