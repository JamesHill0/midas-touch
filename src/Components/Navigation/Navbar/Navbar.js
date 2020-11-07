import React from 'react';
import classes from "./Navbar.module.css";

const Navbar = () => {

    return (
        <nav>
            <div className={`nav-wrapper ${classes.navbarProp}`}>
                <p className={`brand-logo center ${classes.title}`}>Midas</p>
            </div>
        </nav>
            
    );

}

export default Navbar;