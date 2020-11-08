import React from 'react';
import classes from './ErrorMessage.module.css';
import Aux from "../../hoc/Auxilliary";

const ErrorMessage = (props) => {

    const generateErrorMessage = (data) => {

        if ("errorType" in data) {
            return (
                <Aux>
                    <div className={`row center-align ${classes.errorMessageHeader}`}>
                        <i className="large material-icons prefix">error</i>
                    </div>
                    <div className={`row center-align`}>
                        <p className={`flow-text ${classes.leadMessage}`}>Oh no! There's a problem with your search. It's either of the following:</p>
                        <p className={`flow-text ${classes.reasons}`}>You have entered either the wrong session id or query hash.</p>
                        <p className={`flow-text ${classes.reasons}`}>The Instragram username doesn't exists.</p>
                        <p className={`flow-text ${classes.reasons}`}>Your Instagram account has been blocked.</p>
                    </div>
                </Aux>
            )
        }


    }

    return (
        <div className={`${classes.errorMessageContainer} z-depth-3`}>
            {generateErrorMessage(props.errorResults)}
        </div>
    );
    

};

export default ErrorMessage;