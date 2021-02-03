import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Blog, BlogTags } from '../../common/types';

export interface singleBlogProps extends RouteComponentProps<{ id: string }> { };


const SingleBlog: React.FC<singleBlogProps> = ({ history, match: { params: { id } } }) => {
    const [blog, setSingleBlog] = useState<Blog>(null);
    const [blogTag, setSingleBlogTag] = useState<BlogTags[]>(null);

    const getSingleBlog = async () => {
        const r = await fetch (`/api/blogs/${id}`);
        const singleBlog = await r.json();
        setSingleBlog(singleBlog[0]);
    };

    const getBlogTag = async () => {
        const r = await fetch (`/api/blogtags/${id}`);
        const blogTag = await r.json();
        setSingleBlogTag(blogTag);
    }

    useEffect(() => {
        getSingleBlog();
        getBlogTag();
    }, [id])


    return(
        <>
        <div key={blog?.id} className="container">
                <div className="row">
                    <div className="card col-12 mb-4" >
                        <div className="card-header">User{blog?.authorid} created {blog?.title} </div>
                        <div className="card-body">
                            <p>{blog?.content}</p>
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between">
                            <p>{blogTag?.map(bt => `#${bt.tagname}`)}</p>
                            <p className="card-text">Last updated {moment(blog?._created).startOf('minute').fromNow()} at {moment(blog?._created).format('h:mm a')}</p>
                            <button className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
                            <Link className="btn shadow" to={`/${blog?.id}/edit`}> Edit Blog </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleBlog;