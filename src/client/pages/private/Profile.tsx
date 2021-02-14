import * as React from 'react';
import { useState, useEffect } from 'react';
import apiService, { logout } from '../../utils/api-service';
import { IProfileInfo, IProfileBlogs } from '../../../common/types'
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


const Profile = (props: ProfileProps) => {

    const [info, setInfo] = useState<IProfileInfo>(null);
    const [blogs, setBlogs] = useState<IProfileBlogs[]>([]);

    useEffect(() => {
        apiService(`/api/authors/profile`)
            .then(result => {
                setInfo(result.profile);
                setBlogs(result.blogs);
            })
    }, [])



    return (
        <>

            <div className="contatiner">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h4 className="card-title text-center profile">Welcome, {info?.first_name}!</h4>
                            </div>
                        </div>
                    </div>
                    <span>
                        <Link onClick={() => logout()} id="buttonSingle" className="btn shadow m-4" to='/blogs/login'> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d="M7 12h14l-3 -3m0 6l3 -3" />
                        </svg> Logout</Link>
                    </span>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        <ul className="list-group">
                            {blogs.map(blog => (
                                <li key={blog?.id} className="list-group-item d-flex align-items-center justify-content-between">
                                    <span className="profile">{blog?.title}</span>
                                    <div>
                                    <ReactTooltip />
                                        <Link data-tip="View Blog" id="buttonSingle" className="btn shadow mr-4" to={`/blog/${blog?.id}`}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-info" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                            <path d="M11 14h1v4h1" />
                                            <path d="M12 11h.01" />
                                        </svg> </Link>
                                        <Link data-tip="Edit Blog" id="buttonSingle" className="btn shadow mr-4" to={`/${blog?.id}/edit`}> <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#7e858d" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                            <line x1="16" y1="5" x2="19" y2="8" />
                                        </svg> </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}


interface ProfileProps { }

export default Profile;