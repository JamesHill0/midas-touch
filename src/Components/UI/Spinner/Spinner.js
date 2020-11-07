import React from 'react';
import classes from './Spinner.module.css';

const Spinner = () => (

    <div className={classes.spinner}>
        <div className={classes.dot1}></div>
        <div className={classes.dot2}></div>
    </div>

);

export default Spinner;