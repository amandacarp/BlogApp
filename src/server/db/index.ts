import * as mysql from 'mysql';
import config from '../config';
import Blogs from './queries/blogstable';
import BlogTags from './queries/blogtags';
import Tags from './queries/tags';
import Authors from './queries/authors'

//pool connection you don't have to manually write .connent and .end
//creat pool needs an object to connect to db
export const pool = mysql.createPool(config.mysql);

//data layer (db logic), separate from networking later (router logic)
//provide generic - makes sure if we provide a type it uses it, if we don't it defaults to any 
//format funciton - takes query and values, formats them and logs them to debug them
export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        const sql = mysql.format(query, values);
        console.log('Query Running:')
        console.log(sql);
        console.log('');
        pool.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

export default {
    Blogs,
    BlogTags,
    Tags,
    Authors
}
