import * as React from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/api-service'

const MobileNavbar = () => {

    const token = localStorage.getItem(TOKEN_KEY)


    if (token) {
        return (
            <>
                <div className="jumbotron jumbotext" id="jumbo">
                    <h1 className="display-4 ">Quiet Time Blogs</h1>
                    <p className="lead">Welcome, please enjoy!</p>
                    <hr className="my-4"></hr>
                    <p className="lead d-flex justify-content-around">
                        <Link to='/' id="button" className="btn shadow m-2">
                             Home
                        </Link> 

                        <Link to='/blogs/post' id="button" className="btn shadow m-2">
                            Post
                        </Link> 

                        <Link to='/blogs/profile' id="button" className="btn shadow m-2">
                            Profile
                        </Link> 

                        <Link to='/blogs/search' id="button" className="btn shadow m-2">
                            Search
                        </Link> 
                    </p>
                </div>

            </>
        )
    }
    else {
        return (
            <>
                <div className="jumbotron jumbotext" id="jumbo">
                    <h1 className="display-4 ">Quiet Time Blogs</h1>
                    <p className="lead">Welcome, please enjoy!</p>
                    <hr className="my-4"></hr>
                    <p className="lead d-flex justify-content-around">
                        <Link to='/' id="button" className="btn shadow m-2">
                            Home
                        </Link> 

                        <Link to='/blogs/post' id="button" className="btn shadow m-2">
                            Post
                        </Link> 

                        <Link to='/blogs/register' id="button" className="btn shadow m-2">
                            Register
                        </Link> 

                        <Link to='/blogs/login' id="button" className="btn shadow m-2">
                            Login
                        </Link> 

                        <Link to='/blogs/search' id="button" className="btn shadow m-2">
                            Search
                        </Link> 
                    </p>
                </div>

            </>
        )
    }
}

export default MobileNavbar;