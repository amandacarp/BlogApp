import * as express from 'express';
import * as passport from 'passport';
import db from '../../db'
import {IBlog, Author} from '../../../common/types'

const router = express.Router();


router.get('/:id?', async (req, res) => {
    const id: IBlog['id'] = Number(req.params.id);
    try {
        const result = id ? await db.Blogs.by_id(id) : await db.Blogs.all();
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
});

router.delete('/:id?', passport.authenticate('jwt'), async (req: any, res) => {
    const id: IBlog["id"] = Number(req.params.id);
    try {
        db.BlogTags.destroy(id)
        .then(() => {db.Blogs.delete_blog(id)})
        res.status(200).send(`Blog ${id} deleted`)
        console.log(`Blog ${id} deleted`)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.post('/', passport.authenticate('jwt'), async (req: any, res) => {
    const authorid: Author['id'] = req.user.authorid
    const title: IBlog['title'] = req.body.title;
    const content: IBlog['content'] = req.body.content
    try {
        const result = await db.Blogs.add_blog(authorid, title, content)
        console.log(`Blog # ${result.insertId} added!`)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.put('/:id', passport.authenticate('jwt'), async (req: any, res) => {
    const id: IBlog['id'] = Number(req.params.id);
    const blogTitle: IBlog["title"] = req.body.title;
    const blogContent: IBlog["content"] = req.body.content;
    try {
        const result = await db.Blogs.edit_blog(blogTitle, blogContent, id)
        console.log(`Blog ${id} edited`)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;
