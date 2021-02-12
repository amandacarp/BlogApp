import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../common/types';

const HomeCard = ({ blog }: HomeCardProps) => {
    return (
        <div key={blog?.id} className="col-md-4">
            <div className="card m-3" >
                <div className="card-header text-center">{blog?.title}
                    <p className='card-text'>By: {blog?.first_name} {blog?.last_name}</p>
                </div>
                <div className="card-body d-flex justify-content-center">
                    <img src="data:image/jpeg;base64,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" alt="" />                            </div>
                <div className="card-footer text-muted d-flex justify-content-between">
                    <p className="card-text">Last updated {moment(blog?._created).startOf('minute').fromNow()} at {moment(blog?._created).format('h:mm a')}</p>
                    <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-circle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fc575e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                        <line x1="12" y1="12" x2="12" y2="12.01" />
                        <line x1="8" y1="12" x2="8" y2="12.01" />
                        <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>{blog?.num_of_comments}</p>
                    <Link id="buttonSingle" className="btn shadow" to={`/${blog?.id}`}>View Blog</Link>
                </div>
            </div>
        </div>
    )
}

interface HomeCardProps {
    blog: IBlog
}

export default HomeCard;