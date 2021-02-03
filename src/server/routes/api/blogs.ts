import * as express from 'express';
import db from '../../db'
import {Blog, Author} from '../../../common/types'

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
        db.BlogTags.destroy(id)
        .then(() => {db.Blogs.delete_blog(id)})
        res.status(200).send(`Blog ${id} deleted`)
        console.log(`Blog ${id} deleted`)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.post('/', async (req, res) => {
    const authorid: Author["id"] = 1
    const title: Blog['title'] = req.body.title;
    const content: Blog['content'] = req.body.content
    try {
        const result = await db.Blogs.add_blog(authorid, title, content)
        console.log(`Blog # ${result.insertId} added!`)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const blogTitle: Blog["title"] = req.body.title;
    const blogContent: Blog["content"] = req.body.content;
    try {
        const result = await db.Blogs.edit_blog(blogTitle, blogContent, id)
        console.log(`Blog ${id} edited`)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;
