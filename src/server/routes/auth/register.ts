import * as express from 'express';
import db from '../../db';
import { generateHash } from '../../utils/passwords';
import { signToken } from '../../utils/tokens';



const router = express.Router();

router.post('/', async (req, res) => {
    const newAuthor = req.body //data transfer object 
    try {
        newAuthor.password = await generateHash(newAuthor.password);
        const result = await db.Authors.insert(newAuthor);
        const token = signToken({authorid: result.insertId, email: newAuthor.email, username: newAuthor.username})
        res.json(token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})

export default router;



//jwt are stateless - once we make them we send them off. Should not require a db lookup each time it is used 
//payload is not secure - anyone can see what is coded in them- payload confirms who you are
//expires: token becomes useless that does nothing for server, user has to log back in