import * as React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props: FooterProps) => {    
    return (
            <>
            
            <footer className="jumbotext" id="jumboFoot">
                <div className="container">
                    <p className="lead d-flex justify-content-around">

                        <button> <Link to='/blogs/donate' className="button">
                            Donate
	        <div className="button__horizontal"></div>
                            <div className="button__vertical"></div>
                        </Link> </button>

                        <button> <Link to='/blogs/contact' className="button">
                        Contact Me
	        <div className="button__horizontal"></div>
                        <div className="button__vertical"></div>
                    </Link> </button>
                    </p>
                </div>
                </footer>
              
            </>
    );
}

interface FooterProps {}

export default Footer;