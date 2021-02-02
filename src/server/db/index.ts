import * as mysql from 'mysql';
import config from '../config';
import Blogs from './blogstable';
import BlogTags from './blogtags';
import Tags from './tags';

export const pool = mysql.createPool(config.mysql); 


export const Query = <T = any>(query: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(query, values, (err, results) => {
            const sql = mysql.format(query, values);
            console.log('Query Running:')
            console.log(sql);
            console.log('');
            pool.query(sql, (err, results) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    })
}

export default {
    Blogs,
    BlogTags,
    Tags
}
