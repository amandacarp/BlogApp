import config from '../config';
import * as jwt from 'jsonwebtoken'; //makes token
import { IPayload } from '../../common/types';

export function signToken(payload: IPayload){
    return jwt.sign(
         payload, 
         config.jwt.secret, 
         { expiresIn: config.jwt.expires})
 }
//.sign creates token. takes the payload object, secret and optional exp object. You attach a unique signature to each toke. 
//the signature allows us to establish the authenticity of the jwt
//the secret and expires in is hidden behind the .env
//encyrption prevents others from reading the contents of the jwt

//token: has two parts; payload and secret
//payload: is the body; has info that is coded and sent out like the authorid and email. It is a js object that can be populated with w.e we want
//secret stays in the back end- prevents token from being modified


// on the payload, iat stands for issued at
// exp: token expires

//storing json web token in a db:
//pros: easy to validate and look up the token
//cons: resource intensive for constant db lookups

//keeping tokens stateless, signing them and sending them off doesn't store them anywhere
//pros: quick and trustworthy
//cons: difficult to invalidate a token because you'd had to add code and loops to find individual token