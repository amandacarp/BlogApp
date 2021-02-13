import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog, BlogTags, Comments } from '../../../common/types';
import { useParams } from 'react-router-dom'
import BlogCard from '../../components/BlogCard';
import apiService from '../../utils/api-service';
import ReactTooltip from 'react-tooltip';


const SingleBlog = (props: singleBlogProps) => {
    const { id } = useParams<{ id: string }>()
    const [blog, setSingleBlog] = useState<IBlog>(null);
    const [blogTag, setSingleBlogTag] = useState<BlogTags[]>(null);
    const [comments, setComments] = useState<Comments[]>(null)
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        let blogDetails: any = null;
        apiService(`/api/blogs/${id}`)
            .then(blog => {
                blogDetails = blog;
                return apiService(`/api/comments/blogs/${id}`);
            })
            .then(comments => {
                setComments(comments);
                setSingleBlog(blogDetails[0]);
            });
    }, [id]);

    useEffect(() => {
        apiService(`/api/blogtags/${id}`)
            .then(blogTag => setSingleBlogTag(blogTag));
    }, [id])

    //check to see if there are new comments every second 
    useEffect(() => {
        const commentPoll = setInterval(async () => {
            const comments = await apiService(`/api/comments/blogs/${id}`);
            setComments(comments);
        }, 60000);

        return () => clearInterval(commentPoll);
    }, []);


    const handleAddComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await apiService('/api/comments', 'POST', { content, blogid: id });
        const comments = await apiService(`/api/comments/blogs/${id}`);
        setComments(comments);
        setContent('');
    }


    return (
        <>
        <ReactTooltip />

            <BlogCard key={blog?.id} blog={blog} blogTag={blogTag} />

            <section className="row justify-content-center mt-3 ml-3 mr-3">
                <div className="col-md-5 order-2 order-md-1">
                    <form className="form-group bg-white border p-3 mb-3">
                        <label id="labelSelect" htmlFor="comment content">Post your Comment Here!</label>
                        <textarea value={content} onChange={e => setContent(e.target.value)} rows={2} className="form-control" />
                        <button data-tip="Add Comment" id="buttonSingle" onClick={handleAddComment} className="btn mt-2 shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-plus" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
                                <line x1="10" y1="11" x2="14" y2="11" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="col-md-7 order-1 order-md-2 mb-3">
                    <ul className="list-group d-flex">
                        {comments?.map(comment => (
                            <li key={comment?.id} className="list-group-item">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-messages" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                                    <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                                </svg>
                                <small id="labelSelect" className="font-weight-bold d-block mb-2">{comment?.first_name} {comment?.last_name}</small>
                                <p id="labelSelect">{comment?.content}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    )
}

interface singleBlogProps { }

export default SingleBlog;