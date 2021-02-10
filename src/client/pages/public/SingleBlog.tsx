import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog, BlogTags } from '../../../common/types';
import { useParams } from 'react-router-dom'
import BlogCard from '../../components/BlogCard';
import apiService from '../../utils/api-service';

const SingleBlog = (props: singleBlogProps) => {
    const [blog, setSingleBlog] = useState<IBlog>(null);
    const [blogTag, setSingleBlogTag] = useState<BlogTags[]>(null);

    const { id } = useParams<{ id: string }>()


    useEffect(() => {
        apiService(`/api/blogs/${id}`)
            .then(blog => setSingleBlog(blog[0]));
    }, [id])

    useEffect(() => {
        apiService(`/api/blogtags/${id}`)
            .then(blogTag => setSingleBlogTag(blogTag));
    }, [id])


    return (
        <>

        <BlogCard key={blog?.id} blog={blog} blogTag={blogTag} />
        </>
    )
}

interface singleBlogProps { }

export default SingleBlog;