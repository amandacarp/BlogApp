import * as React from 'react';
import { useState, useEffect } from 'react';
import apiService, { logout } from '../../utils/api-service';
import { IProfileInfo, IProfileBlogs } from '../../../common/types'
import { Link } from 'react-router-dom';

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
                                <h4 className="card-title text-center profile">Welcome Back, {info?.first_name}!</h4>
                            </div>
                        </div>
                    </div>
                    <span>
                        <Link onClick={() => logout()} id="buttonSingle" className="btn shadow m-4" to='/blogs/login'> Logout </Link>
                    </span>
                </div>

                <div className="row justify-content-center mt-3">
                    <div className="col-md-6">
                        <ul className="list-group">
                            {blogs.map(blog => (
                                <li key={blog.id} className="list-group-item d-flex align-items-center justify-content-between">
                                    <span className="profile">{blog.title}</span>
                                    <div>
                                        <Link id="buttonSingle" className="btn shadow mr-4" to={`/${blog?.id}`}> View Blog </Link>
                                        <Link id="buttonSingle" className="btn shadow mr-4" to={`/${blog?.id}/edit`}> Edit Blog </Link>
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