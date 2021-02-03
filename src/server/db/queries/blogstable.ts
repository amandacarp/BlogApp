import { Query } from '../index';
import { Blog, Author, MySQLResponse } from '../../../common/types'

const all = async () => Query<Blog[]>('SELECT * FROM Blogs');
const by_id = async (id: Blog["id"]) => Query<Blog>('SELECT * FROM Blogs WHERE id = ?', [id])
const delete_blog = async (id: Blog["id"]) => Query<MySQLResponse>('DELETE FROM Blogs WHERE id = ?', [id]);
const add_blog = async (authorid: Author["id"], title: Blog["title"], content: Blog["content"]) => Query<MySQLResponse>('INSERT into Blogs SET authorid = ?, title = ?, content = ?', [ authorid, title, content ]);
const edit_blog = async (title: Blog["title"], content: Blog["content"], id: Blog["id"]) => Query<MySQLResponse>('UPDATE Blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])


export default {
    all,
    by_id,
    delete_blog,
    add_blog,
    edit_blog
}