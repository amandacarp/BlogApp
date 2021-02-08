import * as express from 'express';
import * as passport from 'passport';
import { signToken } from '../../utils/tokens';

const router = express.Router();

router.post('/', passport.authenticate('local'), async (req: any, res) => {
    try {
        const token = signToken({ 
            authorid: req.user.id, 
            email: req.user.email, 
            username: req.user.username 
        });
        res.json(token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})

export default router;