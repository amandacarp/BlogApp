import { Query } from '../';
import { MySQLResponse } from '../../../common/types';

const insert = (newAuthor: any) => Query<MySQLResponse>('INSERT INTO Authors SET ?', [newAuthor])

export default {
    insert
}