import * as express from 'express';
import * as passport from 'passport';
import db from '../../db' //automatically points to the index.ts file in the db folder
import {IBlog, Author} from '../../../common/types'

const router = express.Router();

//only use passport.authenticate on requests that require a token. All blogs, one blog doesn't need token
//post, put, delete need token

router.get('/search', async (req, res) => {
	const term = req.query.term; //access query param
	try {
		const blogs = await db.Blogs.search(term.toString()); //term must be a string
		res.json(blogs);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'you have an error', error });
	}
});

router.get('/:id?', async (req, res) => {
    const id: IBlog['id'] = Number(req.params.id); //need to turn req.params.id into a number as all params return strings. query will return NaN if number isn't provided
    try {
        const result = id ? await db.Blogs.by_id(id) : await db.Blogs.all(); //if else statement: if id is truthy- show one blog, if id is falsey- show all blogs
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
});

router.delete('/:id?', passport.authenticate('jwt'), async (req: any, res) => {
    const id: IBlog['id'] = Number(req.params.id);
    const authorid: Author['id'] = req.user.authorid
    try {
        await db.BlogTags.destroy(id)
        .then(() => {db.Blogs.delete_blog(id, authorid)})
        res.status(200).send(`Blog ${id} deleted`)
        console.log(`Blog ${id} deleted`)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

router.post('/', passport.authenticate('jwt'), async (req: any, res) => {
    const authorid: Author['id'] = req.user.authorid //must provide authorid when posting 
    const title: IBlog['title'] = req.body.title; //dto doesn't mix network layer with data layer
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
    const blogTitle: IBlog['title'] = req.body.title;
    const blogContent: IBlog['content'] = req.body.content;
    const authorid: Author['id'] = req.user.authorid; //provide authorid on put and delete req to ensure ONLY user who posted can edit and delete
    try {
        const result = await db.Blogs.edit_blog(blogTitle, blogContent, id, authorid)
        console.log(`Blog ${id} edited`)
        res.json(result)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;
