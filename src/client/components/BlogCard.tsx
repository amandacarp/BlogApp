import moment from 'moment';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BlogTags, IBlog } from '../../common/types';

const BlogCard = ({ blog, blogTag }: BlogCardProps) => {

    const history = useHistory<{ history: string }>()

    return (
        <div key={blog?.id} className="container">
            <div className="row">
                <div className="card col-12 mb-4" >
                    <div className="card-header">{blog?.title} <br /> By: {blog?.first_name} {blog?.last_name}</div>
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
                        <p>Tags: {blogTag?.map((bt: { tagname: string; }) => `#${bt.tagname} `)}</p>
                        <p className="card-text">Last updated {moment(blog?._created).startOf('minute').fromNow()} at {moment(blog?._created).format('h:mm a')}</p>
                        <button id="buttonSingle" className="btn shadow" onClick={() => history.goBack()}> Go Back</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

interface BlogCardProps {
    blog: IBlog;
    blogTag?: BlogTags
}

export default BlogCard;