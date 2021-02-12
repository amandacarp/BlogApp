import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IProfileInfo } from '../../common/types';
import apiService, { TOKEN_KEY } from '../utils/api-service';

const Navbar = () => {

    const [info, setInfo] = useState<IProfileInfo>(null);

    //grab profile info in order to display welcome, first_name in nav
    useEffect(() => {
        apiService(`/api/authors/profile`)
            .then(result => {
                setInfo(result.profile);
            })
    }, [])
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
        return (
            <>
                <div className="jumbotron jumbotext" id="jumbo">
                    <h1 className="display-4 ">Chasing the Sunset Blogs</h1>
                    <p className="lead">Welcome, please enjoy!</p>
                    <hr className="my-4"></hr>
                    <p className="lead d-flex justify-content-around">
                        <button> <Link to='/' className="button">
                            Go Home
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/post' className="button">
                            Post a Blog
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/register' className="button">
                            Register New User
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/login' className="button">
                            Login
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/search' className="button">
                            Search
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/donate' className="button">
                            Donate
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>
                    </p>
                </div>
            </>
        )
    } else {
        return (
            <div className="jumbotron jumbotext" id="jumbo">
                <h1 className="display-4 ">Chasing the Sunset Blogs</h1>
                <p className="lead">Welcome, {info?.first_name}! Please enjoy!</p>
                <hr className="my-4"></hr>
                <p className="lead d-flex justify-content-around">

                    <button> <Link to='/' className="button">
                        Go Home
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>

                    <button> <Link to='/blogs/post' className="button">
                        Post a Blog
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>

                    <button> <Link to='/blogs/profile' className="button">
                        Go To Your Profile
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>

                    <button> <Link to='/blogs/search' className="button">
                        Search
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>

                    <button> <Link to='/blogs/donate' className="button">
                        Donate
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>

                </p>
            </div>
        )
    }
}

export default Navbar;