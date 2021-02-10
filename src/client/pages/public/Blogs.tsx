import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog } from '../../../common/types';
import HomeCard from '../../components/HomeCard';
import apiService from '../../utils/api-service';

const Blogs = (props: BlogsProps) => {

    const [blogs, setBlogs] = useState<IBlog[]>(null);

    useEffect(() => {
        apiService('/api/blogs')
            .then(blogs => setBlogs(blogs));
    }, [])


    return (
        <>
        <div className="row">
            {blogs?.map(blog => (
                <HomeCard key={blog?.id} blog={blog} />
            ))}
        </div>
        </>
    )
}

interface BlogsProps { }

export default Blogs;