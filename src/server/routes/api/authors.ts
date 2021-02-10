import { Router } from 'express';
import * as passport from 'passport';
import db from '../../db'

const router = Router()
//creating a profile page for specific users (authors) by grabbing their db credentials and all blogs they've created
router.get('/profile', passport.authenticate('jwt'), async (req: any, res) => { //callback function to db that runs after router finds '/profile'
    try {
        const authorid = req.user.authorid
        const [profile] = await db.Authors.one(authorid); //gets 
        const blogs = await db.Blogs.find('authorid', authorid)
        delete profile.password;
        res.json({profile, blogs}) //converts json to js and displays
    } catch (error) {
        res.status(500).send(error.sqlMessage)
    }
})

export default router;