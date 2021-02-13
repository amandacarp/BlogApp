import * as dotenv from 'dotenv';

//look for .env file and parse- turn into environment variables that you can access
dotenv.config(); 

// config object uses .env variables
export default {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    },
    keys: {
        stripe: process.env.STRIPE_SK,
        mailgun: process.env.MAILGUN_SK,
        mailgunDomain: process.env.MAILGUN_DOMAIN
    }
}