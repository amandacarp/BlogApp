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
    }
}