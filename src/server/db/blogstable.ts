import { Query } from './index';
import { MySQLResponse } from './models'

const all = async () => Query<MySQLResponse>('SELECT * FROM Blogs');
const by_id = async (id: number) => Query<MySQLResponse>('SELECT * FROM Blogs WHERE id = ?', [id])
const delete_blog = async (id: number) => Query<MySQLResponse>('DELETE FROM Blogs WHERE id = ?', [id]);
const add_blog = async (authorid: number, title: string, content: string) => Query<MySQLResponse>('INSERT into Blogs SET authorid = ?, title = ?, content = ?', [ authorid, title, content ]);
const edit_blog = async (title: string, content: string, id: number) => Query<MySQLResponse>('UPDATE Blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])


export default {
    all,
    by_id,
    delete_blog,
    add_blog,
    edit_blog
}