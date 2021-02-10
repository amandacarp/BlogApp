import * as express from 'express';
import * as passport from 'passport';
import { signToken } from '../../utils/tokens';

const router = express.Router();

//this will login a currently registered user
//login will always use passport.authenticate, need to use to create a token
// we need to write a post route because we will be sending up a req.body that has the username and password we're trying to log in with
// putting the passport middleware after the request means it will intercept our request before it is complete 
router.post('/', passport.authenticate('local'), async (req: any, res) => {
    try {
        const token = signToken({ 
            authorid: req.user.id, //authorid comes from IPayload. req.user is created when you log in using passport strategy
            email: req.user.email, 
            username: req.user.username 
        });
        res.json(token) //a new token is created every time you login
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})

export default router;