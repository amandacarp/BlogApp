import * as express from 'express';
import { generateHash } from '../../utils/passwords';
import db from '../../db';

const router = express.Router();

router.post('/', async (req, res) => {
    const newAuthor = req.body //data transfer object 
    try {
        newAuthor.password = await generateHash(newAuthor.password);
        const result = await db.Authors.insert(newAuthor);
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})


export default router;
