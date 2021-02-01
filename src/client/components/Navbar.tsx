import * as React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="navbar border-bottom border-light sticky-top mb-4">
            <a> Blogs</a>
            <Link to='/'>Go Home</Link>
        </nav>
    )
}

export default Navbar;