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
                        <button> <Link to='/'>
                            Go Home
                        </Link> </button>

                        <button> <Link to='/blogs/post' id="buttonSingle" className="btn shadow">
                            Post a Blog
                        </Link> </button>

                        <button> <Link to='/blogs/profile' id="buttonSingle" className="btn shadow">
                            Go To Your Profile
                        </Link> </button>

                        <button> <Link to='/blogs/search' id="buttonSingle" className="btn shadow">
                            Search
                        </Link> </button>
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
                        <button> <Link to='/' id="buttonSingle" className="btn shadow">
                            Go Home
                        </Link> </button>

                        <button> <Link to='/blogs/post' id="buttonSingle" className="btn shadow">
                            Post a Blog
                        </Link> </button>

                        <button> <Link to='/blogs/register' id="buttonSingle" className="btn shadow">
                            Register New User
                        </Link> </button>

                        <button> <Link to='/blogs/login' id="buttonSingle" className="btn shadow">
                            Login
                        </Link> </button>

                        <button> <Link to='/blogs/search' id="buttonSingle" className="btn shadow">
                            Search
                        </Link> </button>
                    </p>
                </div>

            </>
        )
    }
}

export default MobileNavbar;