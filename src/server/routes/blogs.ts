import * as express from 'express';
import db from '../db'

const router = express.Router();


router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = id ? await db.Blogs.by_id(id) : await db.Blogs.all();
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
});

router.delete('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const result = await db.Blogs.delete_blog(id)
        res.json(result)
        console.log(`Blog ${id} deleted`)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.post('/', async (req, res) => {
    const authorid = 1
    const title = req.body.title;
    const content = req.body.content
    try {
        const result = await db.Blogs.add_blog(authorid, title, content)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const blogTitle = req.body.title;
    const blogContent = req.body.content;
    try {
        const result = await db.Blogs.edit_blog(blogTitle, blogContent, id)
        res.json(result)
        console.log(`Blog ${id} edited`)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;
