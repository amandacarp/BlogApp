import * as React from 'react';
import { useState, useEffect } from 'react';
import { IBlog } from '../../common/types';
import HomeCard from '../pages/HomeCard';

const Blogs = (props: BlogsProps) => {

    const [blogs, setBlogs] = useState<IBlog[]>(null);

    const getBlogs = async () => {
        const r = await fetch('/api/blogs');
        const blogs = await r.json();
        setBlogs(blogs);
    }

    useEffect(() => { getBlogs(); }, [])


    return (
        <div className="row">
            {blogs?.reverse().map(blog => (
                <HomeCard key={blog?.id} blog={blog}/>
            ))}
        </div>
    )
}

interface BlogsProps {}

export default Blogs;