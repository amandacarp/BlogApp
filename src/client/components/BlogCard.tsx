import moment from 'moment';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BlogTags, IBlog } from '../../common/types';
import ReactTooltip from 'react-tooltip';


const BlogCard = ({ blog, blogTag }: BlogCardProps) => {

    const history = useHistory<{ history: string }>()

    return (
        <>
        <ReactTooltip />

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

                        

                        <button data-tip="Go Back" id="buttonSingle" className="btn shadow" onClick={() => history.goBack()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

interface BlogCardProps {
    blog: IBlog;
    blogTag?: BlogTags
}

export default BlogCard;