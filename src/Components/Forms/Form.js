import React from "react";
import classes from "./Form.module.css";

const Form = () => {
    return (

        <div className="row">
            <form className="col s12">
                <div className="row">
                    <div className={`${classes.inputField} input-field col s6`}>
                        <input id="instagram_session_id" type="text" className="validate"/>
                        <label for="instagram_session_id">Instagram Session ID</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s6`}>
                        <input id="query_hash" type="text" className="validate"/>
                        <label for="query_hash">Query Hash</label>
                    </div>
                </div>
            </form>
        </div>

    );

}

export default Form;