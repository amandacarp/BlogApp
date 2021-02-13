import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../common/types';
import ReactTooltip from 'react-tooltip';


const HomeCard = ({ blog }: HomeCardProps) => {
    return (
        <>
        <ReactTooltip />
    
        <div key={blog?.id} className="col-md-4">
            <div className="card m-3" >
                <div className="card-header text-center">{blog?.title}
                    <p className='card-text'>By: {blog?.first_name} {blog?.last_name}</p>
                </div>
                <div className="card-body d-flex justify-content-center">
                    <img src="data:image/jpeg;base64,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" alt=""/>
                    </div>
                <div className="card-footer text-muted d-flex justify-content-between">
                    <p className="card-text">Last updated {moment(blog?._created).startOf('minute').fromNow()} at {moment(blog?._created).format('h:mm a')}</p>
                    <p className="card-text"><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message-circle" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                        <line x1="12" y1="12" x2="12" y2="12.01" />
                        <line x1="8" y1="12" x2="8" y2="12.01" />
                        <line x1="16" y1="12" x2="16" y2="12.01" />
                    </svg>{blog?.num_of_comments}</p>
                    <Link data-tip="View Blog" id="buttonSingle" className="btn shadow" to={`/blog/${blog?.id}`}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-info" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                        <path d="M11 14h1v4h1" />
                        <path d="M12 11h.01" />
                    </svg></Link>
                </div>
            </div>
        </div>

        </>
    )
}

interface HomeCardProps {
    blog: IBlog
}

export default HomeCard;