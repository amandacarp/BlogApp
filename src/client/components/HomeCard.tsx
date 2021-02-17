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
                    <Link  to={`/blog/${blog?.id}`}> <img src="/assets/pastels.jpeg" alt="pastel" /></Link>
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