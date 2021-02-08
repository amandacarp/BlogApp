import { Query } from '../';
import { Author, MySQLResponse } from '../../../common/types';

const insert = (newAuthor: any) => Query<MySQLResponse>('INSERT INTO Authors SET ?', [newAuthor])
const find = (column: string, value: string | number) => Query<Author[]>('SELECT * FROM Authors WHERE ?? = ?', [column, value])

export default {
    insert,
    find
}