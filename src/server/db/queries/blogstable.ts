import { Query } from '../index';
import { IBlog, Author, MySQLResponse } from '../../../common/types'

const all = async () => Query<IBlog[]>('SELECT Blogs.*, Authors.first_name, Authors.last_name, COUNT(comments.id) AS num_of_comments FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid LEFT JOIN comments ON comments.blogid = Blogs.id GROUP BY Blogs.id ORDER BY Blogs._created DESC');
const by_id = async (id: IBlog['id']) => Query<IBlog>('SELECT Blogs.*, Authors.first_name, Authors.last_name FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid WHERE Blogs.id = ?', [id])
const delete_blog = async (id: IBlog['id'], authorid: IBlog['authorid']) => Query<MySQLResponse>('DELETE FROM Blogs WHERE id = ? AND authorid = ?', [id, authorid]);
const add_blog = async (authorid: Author['id'], title: IBlog['title'], content: IBlog['content']) => Query<MySQLResponse>('INSERT into Blogs SET authorid = ?, title = ?, content = ?', [ authorid, title, content ]);
const edit_blog = async (title: IBlog['title'], content: IBlog['content'], id: IBlog['id'], authorid: IBlog['authorid']) => Query<MySQLResponse>('UPDATE Blogs SET title = ?, content = ? WHERE id = ? AND authorid = ?', [title, content, id, authorid])
const find = (column: string, value: string | number) => Query<IBlog[]>('SELECT * FROM Blogs WHERE ?? = ?', [column, value])
const search = (term: string) =>
	Query(
		'SELECT Blogs.*,  Authors.first_name, Authors.last_name FROM Blogs JOIN Authors ON Authors.id = Blogs.authorid WHERE Blogs.title LIKE ?',
		[`%${term}%`]
	);


export default {
    all,
    by_id,
    delete_blog,
    add_blog,
    edit_blog,
    find,
    search
}