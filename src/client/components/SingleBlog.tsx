import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IBlog, BlogTags } from '../../common/types';
import { useParams, useHistory } from 'react-router-dom'
import BlogCard from '../pages/BlogCard';

const SingleBlog= (props: singleBlogProps) => {
    const [blog, setSingleBlog] = useState<IBlog>(null);
    const [blogTag, setSingleBlogTag] = useState<BlogTags[]>(null);

    const { id } = useParams<{ id: string}>()
    const history  = useHistory<{history: string}>()

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
        <BlogCard key={blog?.id} blog={blog} blogTag={blogTag}/>
    )
}

interface singleBlogProps {}

export default SingleBlog;