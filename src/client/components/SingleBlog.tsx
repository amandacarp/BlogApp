import moment from 'moment';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IBlog, BlogTags } from '../../common/types';
import { useParams, useHistory } from 'react-router-dom'

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
        <>
        <div key={blog?.id} className="container">
                <div className="row">
                    <div className="card col-12 mb-4" >
                        <div className="card-header">{blog?.title} <br/> By: User {blog?.authorid}</div>
                        <div className="card-body">
                        <p className="card-text text-justify">
						{blog?.content.split('\n').map((pararaph, i) => (
							<span key={`paragraph-${i}`}>
								{pararaph}
								<br />
							</span>
						))}
					</p>
                        </div>
                        <div className="card-footer text-muted d-flex justify-content-between">
                            <p>Tags: {blogTag?.map(bt => `#${bt.tagname} `)}</p>
                            <p className="card-text">Last updated {moment(blog?._created).startOf('minute').fromNow()} at {moment(blog?._created).format('h:mm a')}</p>
                            <Link id="buttonSingle" className="btn shadow mr-4" to={`/${blog?.id}/edit`}> Edit Blog </Link>
                            <button id="buttonSingle" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

interface singleBlogProps {}

export default SingleBlog;