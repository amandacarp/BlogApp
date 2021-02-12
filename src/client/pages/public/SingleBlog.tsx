import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog, BlogTags, Comments } from '../../../common/types';
import { useParams } from 'react-router-dom'
import BlogCard from '../../components/BlogCard';
import apiService from '../../utils/api-service';

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

    const handleAddComment = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await apiService('/api/comments', 'POST', {content, blogid: id});
        const comments = await apiService(`/api/comments/blogs/${id}`);
        setComments(comments);
        setContent('');
    }


    return (
        <>
        <BlogCard key={blog?.id} blog={blog} blogTag={blogTag} />

        <section className="row justify-content-center mt-3 ml-3 mr-3">
				<div className="col-md-5 order-2 order-md-1">
					<form className="form-group bg-white border p-3 mb-3">
						<label id="labelSelect" htmlFor="comment content">Post your Comment Here!</label>
						<textarea value={content} onChange={e => setContent(e.target.value)} rows={5} className="form-control"/>
						<button id="buttonSingle" onClick={handleAddComment} className="btn mt-2">Add Comment</button>
					</form>
				</div>
				<div className="col-md-7 order-1 order-md-2 mb-3">
					<ul className="list-group">
                    <label id="label" htmlFor="comment content">Comments</label>
						{comments?.map(comment => (
							<li key={comment.id} className="list-group-item">
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