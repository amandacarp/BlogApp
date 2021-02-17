import * as React from 'react';
import { Link } from 'react-router-dom';

const MobileFooter = (props: MobileFooterProps) => {    
    return (
            <>
            
            <footer className="jumbotron fixed-bottom jumbotext" id="jumboFoot">
                    <p className="lead d-flex justify-content-around">

                        <Link to='/blogs/donate' id="button" className="btn shadow m-2">
                            Donate
                        </Link> 

                        <Link to='/blogs/contact' id="button" className="btn shadow m-2">
                        Contact Me
                    </Link> 
                    </p>

                </footer>
            </>
    );
}

interface MobileFooterProps{}

export default MobileFooter;