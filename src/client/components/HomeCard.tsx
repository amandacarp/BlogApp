import moment from 'moment';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../common/types';
import ReactTooltip from 'react-tooltip';

const HomeCard = ({ blog }: HomeCardProps) => {
    return (
        <>
            <ReactTooltip />

            <div className="col-md-4">
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