import { Query } from '../';
import { Author, MySQLResponse } from '../../../common/types';

const one = (authorid: number) => Query<Author[]>('SELECT * FROM Authors WHERE id = ?', [authorid]);
const insert = (newAuthor: any) => Query<MySQLResponse>('INSERT INTO Authors SET ?', [newAuthor])
//same as saying const insert (name: string, email: string) => Query('INSERT INTO authors (name, email) VALUE (?, ?)', [name, email]);
const find = (column: string, value: string | number) => Query<Author[]>('SELECT * FROM Authors WHERE ?? = ?', [column, value])
// this lets you find and check any column on a table. Helpful for looking up an email column to authenticate and match with a user logging in
// we don't want to have to write a one query for every column we have in the database
// find can replace all of your one queries
// ?? is the escape character for columns. ? is the escape character for values. they get parsed differently for sql injection attacks
// ?? can be placeholders for columns that are passed in dynamically


export default {
    one,
    insert,
    find
}