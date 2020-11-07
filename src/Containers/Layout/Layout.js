import React from 'react';
import Navbar from '../../Components/Navigation/Navbar/Navbar';
import Aux from '../../hoc/Auxilliary';
import classes from "./Layout.module.css";

const Layout = (props) => {

    return (
        <Aux>
            <Navbar/>
            {props.children}
        </Aux>
    )

}

export default Layout;