import config from '../config';
import * as jwt from 'jsonwebtoken'; //makes token
import { IPayload } from '../../common/types';

export function signToken(payload: IPayload){
    return jwt.sign(
         payload, 
         config.jwt.secret, 
         { expiresIn: config.jwt.expires})//.sign creates token. takes the payload object, secret and optional exp object
 }