import { Router } from 'express';
import * as passport from 'passport';
import db from '../../db'

const router = Router()

router.get('/profile', passport.authenticate('jwt'), async (req: any, res) => {
    try {
        const authorid = req.user.authorid
        const [profile] = await db.Authors.one(authorid);
        const blogs = await db.Blogs.find('authorid', authorid)
        delete profile.password;
        res.json({profile, blogs})
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;