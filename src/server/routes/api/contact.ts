import * as express from 'express';
import sendEmail from '../../utils/contact';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const emailInfo = req.body //store req.body in variable
        const result = await sendEmail('carpentieri.a@gmail.com', emailInfo.email, emailInfo.subject, emailInfo.content); //get result from mailgun server
        res.json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'you have an error', error: error.message }) 
    }
})

export default router;