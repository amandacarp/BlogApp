import * as passport from 'passport'
//we have to write middleware for passport like we do app. these are called strategies
import * as LocalStrategy from 'passport-local'
import db from '../db';
import { comparePasswords } from '../utils/passwords';
import * as PassportJWT from 'passport-jwt';
import config from '../config';
import { IPayload } from '../../common/types';

passport.serializeUser((user, done) => done(null, user)); //create req.user 
passport.deserializeUser((user, done) => done(null, user)); //remove req.user in certain cases
//these will create a req.user which represents who is currently logged in
//these must go before you initilize your routes
//user is saved in the session and is later used to retrieve the whole object via deseralize function
//process consists of encoding a header, payload and signature if pressent with base64url algorithm

//passport uses use like express
//passport strategies are written as object oriented classes
//local accepts a username as a default so we can override that with one of our properites - like email
passport.use(new LocalStrategy.Strategy({ usernameField: 'email' }, async (email, password, done) => { //done function used by passport to determine when strategy is done
    //email and pw are automatically pulled from the req.body and given as variables. no need to store them in dto
    try {
        const [authorRecord] = await db.Authors.find('email', email)
        //when someone tries to login - we need to verify the email matches the email in our db
        //we can compare the 'email' column in the db with the email they are trying with at log in(from req.body)
        //first param must match column name in your db
        if (authorRecord && comparePasswords(password, authorRecord.password)) {
            //first param is the plain text pw submitted by a user, second param is the hash pw stored in our db
            delete authorRecord.password; //ensure pw is not returned to front end 
            done(null, authorRecord); //no error so the first argument is null
            //if two pw match- delete pw and serialize the req.user again
        } else {
            done(null, false); //false will default to 401 unauthorized
        }
    } catch (error) {
        done(error);
    }
}));

// local lets you authenticate using a username and password in node.js applications
// local is used with logging in to a website when using our own database and our own written logic
// logging in via google or facebook or twitter have their own passport strategies

// someone attemps to log in with an req.body.email and req.body.password
// look up the email in the database 
// if the email finds a person, and the password they log in with matches what is stored in the database using the salt and hashing
// then the author info stored in the database becomes the req.user
// if the author email is not found, or the password does not match, respond with a 401

passport.use(new PassportJWT.Strategy({ //tells our server how to handle a bearer token req
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), //bearer token goes in header.holding token in the body w/o using bearer will be easier to hack
    //jwtfromrequest asks how we are sending the jwt to the server - we are sending as a bearer token 
    secretOrKey: config.jwt.secret //must provide secret key to verify
}, (payload: IPayload, done) => {
    done(null, payload)
}))


// passport.jwt will automatically handle the expiration

// extract the token from the header
// verify the token by checking the secret
// display the payload 

