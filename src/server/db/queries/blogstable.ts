import { Query } from '../index';
import { IBlog, Author, MySQLResponse } from '../../../common/types'

const all = async () => Query<IBlog[]>('SELECT Blogs.*, Authors.username, Authors.first_name, Authors.last_name FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid');
const by_id = async (id: IBlog["id"]) => Query<IBlog>('SELECT * FROM Blogs WHERE id = ?', [id])
const delete_blog = async (id: IBlog["id"]) => Query<MySQLResponse>('DELETE FROM Blogs WHERE id = ?', [id]);
const add_blog = async (authorid: Author["id"], title: IBlog["title"], content: IBlog["content"]) => Query<MySQLResponse>('INSERT into Blogs SET authorid = ?, title = ?, content = ?', [ authorid, title, content ]);
const edit_blog = async (title: IBlog["title"], content: IBlog["content"], id: IBlog["id"]) => Query<MySQLResponse>('UPDATE Blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])
const find = (column: string, value: string | number) => Query<IBlog[]>('SELECT * FROM Blogs WHERE ?? = ?', [column, value])


export default {
    all,
    by_id,
    delete_blog,
    add_blog,
    edit_blog,
    find
}