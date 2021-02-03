import * as express from 'express';
import db from '../../db'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tags = await db.Tags.all();
        res.json(tags);
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;