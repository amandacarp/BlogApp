import { Router } from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = Router();

router.get('/blogs/:blogid', async (req, res) => {
    try {
        const blogid = Number(req.params.blogid)
        const comments =  await db.Comments.allforBlog(blogid)
        res.json(comments)
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
});

router.post('/', passport.authenticate('jwt'), async (req: any, res) => {
    const newComment = req.body
    try {
        newComment.authorid = req.user.authorid
        await db.Comments.insert(newComment)
        res.json({message: 'new comment inserted'})
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;