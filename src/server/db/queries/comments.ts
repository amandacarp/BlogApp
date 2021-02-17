import { Query } from '../';
import { Author, Comments, MySQLResponse } from '../../../common/types';

const allforBlog = (blogid: number) => Query<Comments & Author[]>(`
SELECT 
    comments.*,
    authors.first_name,
    authors.last_name
FROM 
    comments
        JOIN
    authors on authors.id = comments.authorid
WHERE comments.blogid = ? 
ORDER BY _created ASC`, [blogid]);
const insert = (newComment: any) => Query<MySQLResponse>('INSERT INTO comments SET ?', newComment);
const destroy = (blogid: number) => Query('DELETE FROM comments WHERE blogid = ?', [blogid])

export default {
    allforBlog,
    insert,
    destroy
}