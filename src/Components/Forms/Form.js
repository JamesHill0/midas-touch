import React, { useState } from "react";
import classes from "./Form.module.css";
import Aux from '../../hoc/Auxilliary';

const Form = (props) => {

    const [instagramSessionID, setInstagramSessionID] = useState("");
    const [queryHash, setQueryHash] = useState("");
    const [instagramUsername, setInstagramUsername] = useState("");
    const [minFollowers, setMinFollowers] = useState("");
    const [maxFollowers, setMaxFollowers] = useState("");

    const handleMinFollowers = (event) => {
        setMinFollowers(event.target.value)
    }

    const handleMaxFollowers = (event) => {
        setMaxFollowers(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(instagramSessionID);
        console.log(queryHash);
    }

    return (
        <form className={`row ${classes.form}`} onSubmit={handleSubmit}>

                <div className="row">
                    <div className={`${classes.inputField} input-field col s6`}>
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="instagram_session_id" type="text" className="validate" value={instagramSessionID} onChange={(event)=>setInstagramSessionID(event.target.value)}/>
                        <label for="instagram_session_id">Instagram Session ID</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s6`}>
                        <i className="material-icons prefix">enhanced_encryption</i>
                        <input id="query_hash" type="text" className="validate" value={queryHash} onChange={(event)=>setQueryHash(event.target.value)}/>
                        <label for="query_hash">Query Hash</label>
                    </div>
                </div>
                <div className="row">
                    <div className={`${classes.inputField} input-field col s6`}>
                        <i className="material-icons prefix">account_circle</i>
                        <input id="instagram_username" type="text" className="validate" value={instagramUsername} onChange={(event)=>setInstagramUsername(event.target.value)}/>
                        <label for="instagram_username">Instagram Username</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s6`}>
                        <i className="material-icons prefix">enhanced_encryption</i>
                        <input id="min_followers" type="number" className="validate" value={minFollowers} onChange={handleMinFollowers}/>
                        <label for="min_followers">Minimum Followers</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s6`}>
                        <i className="material-icons prefix">enhanced_encryption</i>
                        <input id="max_followers" type="number" className="validate" value={maxFollowers} onChange={handleMaxFollowers}/>
                        <label for="max_followers">Maximum Followers</label>
                    </div>
                </div>
                <div className="row">
                    <button className={`waves-effect waves-light btn right ${classes.searchButton}`} type="submit" name="search">Search
                        <i class="material-icons left">search</i>
                    </button>
                </div>

        </form>

    );

}

export default Form;