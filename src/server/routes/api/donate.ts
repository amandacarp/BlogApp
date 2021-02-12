import * as express from 'express';
import charge from '../../utils/donate';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const donateInfo = req.body;
        const result = await charge(donateInfo.token.id, donateInfo.amount);
        // donateInfo.amount is the amount filled out in the amount field on the front end form 
        // donateInfo.token.id is the actual token string value on the token object generated by stripe
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'you have an error', error: error.message }) 
    }
})

export default router;