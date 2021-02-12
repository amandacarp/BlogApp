import * as React from 'react';
import { Link } from 'react-router-dom';

const LoggedinNav = () => {

    return (

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

                <button> <Link to='/blogs/profile' className="button">
                    Go To Your Profile
	        <div className="button__horizontal"></div>
                    <div className="button__vertical"></div>
                </Link> </button>

            </p>




        </div>

    )
}

export default LoggedinNav;