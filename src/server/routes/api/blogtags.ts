import * as express from 'express';
import { IBlog } from '../../../common/types';
import db from '../../db'

const router = express.Router();

router.get('/:blogid', async (req, res) => {
    const blogid: IBlog['id'] = Number(req.params.blogid);
    try {
        const blogtags = await db.BlogTags.tags(blogid);
        res.json(blogtags[0]);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    const blogTags = req.body;
    const {blogid, tagid} = blogTags //destructured from the blogtag db table 
    try {
        console.log(blogid, tagid);
        const blogTagPost = await db.BlogTags.create(blogid, tagid);
        res.json(blogTagPost)
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.put('/:id', passport.authenticate('jwt'), async (req, res) => {
//     const id = Number(req.params.id)
//     const tagDTO = req.body
//     try {
//         await db.blogtags.update(tagDTO.newId, tagDTO.oldId, id)
//         res.json({ msg: 'blogtag(s) changed' })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: 'my code sucks :(', error: error.message })
//     }
// })

// router.delete('/:id', passport.authenticate('jwt'), async (req, res) => {
//     try {
//         const id = Number(req.params.id)
//         await db.blogtags.destroy(id);
//         res.json({ msg: 'You have been banished to the shadow realm!' });
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ msg: 'my code sucks :(', error: error.message })
//     }
// })

export default router;