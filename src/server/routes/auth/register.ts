import * as express from 'express';
import db from '../../db';
import { generateHash } from '../../utils/passwords'; //hased pw is generated when a new user registers
import { signToken } from '../../utils/tokens';



const router = express.Router();

//post request because someone has to fill out a form and submit in order to register
router.post('/', async (req, res) => {
    const newAuthor = req.body //data transfer object. req.body is all of our form data (email, name, pw, etc)
    try {
        newAuthor.password = await generateHash(newAuthor.password); //right hand side of equal sign evaluates first. takes plain text pw on the req.body, passes through algorithm and generates hash and salt pw and reassigns itself to itself
        const result = await db.Authors.insert(newAuthor); //db query to register a new user to db
        const token = signToken({authorid: result.insertId, email: newAuthor.email, username: newAuthor.username}) //result.insertid is the id of who just inserted into authors table. authorid comes from Ipayload
        //createToken takes the payload as the parameter. payload comes attached to the req.body of each user. id specifies each user
        res.json(token) //returns json web token. encoded not encypted
        //token is stored in state on front end until user logs out
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'you have an error', error: error.sqlMessage })
    }
})

export default router;



//jwt are stateless - once we make them we send them off. Should not require a db lookup each time it is used 
//payload is not secure - anyone can see what is coded in them- payload confirms who you are
//expires: token becomes useless that does nothing for server, user has to log back in