import { Query } from '../index';

const tags = (blogid: number) => Query('CALL spBlogTags(?)', [blogid])
const create = (blogid: number, tagid: number) => Query('INSERT INTO BlogTags SET ?', {blogid, tagid})
const destroy = (blogid: number) => Query('DELETE FROM BlogTags WHERE blogid = ?', [blogid])

export default {
    tags,
    create,
    destroy
};
