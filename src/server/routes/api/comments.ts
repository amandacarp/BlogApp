import { Router } from 'express';
import * as passport from 'passport';
import db from '../../db';

const router = Router();

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

router.get('/', async (req, res) => {
    try {
        res.json('TEST');
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'my code sucks', error: error.message })
    }
})

export default router;