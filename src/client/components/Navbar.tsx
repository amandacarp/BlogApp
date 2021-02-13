import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {



        return (
            <>
                <div className="jumbotron jumbotext" id="jumbo">
                    <h1 className="display-4 ">Quiet Time Blogs</h1>
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


                    </p>
                </div>

            </>
        )
}

export default Navbar;