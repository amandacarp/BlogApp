import { Query } from './index';

const all = async () => Query('SELECT * FROM Blogs');
const by_id = async (id: number) => Query('SELECT * FROM Blogs WHERE id = ?', [id])
const delete_blog = async (id: number) => Query('DELETE FROM Blogs WHERE id = ?', [id]);
const add_blog = async (authorid: number, title: string, content: string) => Query('INSERT into Blogs SET authorid = ?, title = ?, content = ?', [ authorid, title, content ]);
const edit_blog = async (title: string, content: string, id: number) => Query('UPDATE Blogs SET title = ?, content = ? WHERE id = ?', [title, content, id])


export default {
    all,
    by_id,
    delete_blog,
    add_blog,
    edit_blog
}