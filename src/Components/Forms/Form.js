import React, { useState, useEffect } from "react";
import classes from "./Form.module.css";

const Form = (props) => {

    const {disableSearchButton, fetchResults} = props;
    const [instagramSessionID, setInstagramSessionID] = useState("");
    const [queryHash, setQueryHash] = useState("");
    const [instagramUsername, setInstagramUsername] = useState("");
    const [minFollowers, setMinFollowers] = useState("");
    const [maxFollowers, setMaxFollowers] = useState("");

    const handleInstagramSessionID = (event) => {
        setInstagramSessionID(event.target.value.trim());
    }

    const handleQueryHash = (event) => {
        setQueryHash(event.target.value.trim());
    }

    const handleInstagramUsername = (event) => {
        setInstagramUsername(event.target.value.trim());
    }

    const handleMinFollowers = (event) => {
        setMinFollowers(event.target.value);
    }

    const handleMaxFollowers = (event) => {
        setMaxFollowers(event.target.value);
    }

    const checkIfValuesAreValid = (value) => {

        return (+value>=0 && value !== "")

    }

    useEffect(() => {
        if (!!instagramSessionID && !!queryHash && !!instagramUsername && checkIfValuesAreValid(minFollowers) && checkIfValuesAreValid(maxFollowers) && +maxFollowers >= +minFollowers) {
            disableSearchButton(false);
        } else {
            disableSearchButton(true);
        }
    }, [disableSearchButton, instagramSessionID, queryHash, instagramUsername, minFollowers, maxFollowers]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchResults(instagramSessionID, queryHash, instagramUsername, maxFollowers, minFollowers);
    }

    return (
        <form className={`row ${classes.form}`} onSubmit={handleSubmit}>
                <div className="row">
                    <div className={`${classes.inputField} input-field col s12 m6 l6`}>
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="instagram_session_id" type="text" className="validate" value={instagramSessionID} onChange={handleInstagramSessionID}/>
                        <label htmlFor="instagram_session_id">Instagram Session ID</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s12 m6 l6`}>
                        <i className="material-icons prefix">enhanced_encryption</i>
                        <input id="query_hash" type="text" className="validate" value={queryHash} onChange={handleQueryHash}/>
                        <label htmlFor="query_hash">Query Hash</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s12 m6 l4`}>
                        <i className="material-icons prefix">account_circle</i>
                        <input id="instagram_username" type="text" className="validate" value={instagramUsername} onChange={handleInstagramUsername}/>
                        <label htmlFor="instagram_username">Instagram Username</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s12 m6 l4`}>
                        <i className="material-icons prefix">accessibility</i>
                        <input id="min_followers" type="number" className="validate" value={minFollowers} onChange={handleMinFollowers}/>
                        <label htmlFor="min_followers">Minimum Followers</label>
                    </div>
                    <div className={`${classes.inputField} input-field col s12 m6 l4`}>
                        <i className="material-icons prefix">people</i>
                        <input id="max_followers" type="number" className="validate" value={maxFollowers} onChange={handleMaxFollowers}/>
                        <label htmlFor="max_followers">Maximum Followers</label>
                    </div>
                </div>
                <div className="row">
                    <button disabled={props.isSearchButtonDisabled} className={`waves-effect waves-light btn right ${classes.searchButton}`} type="submit" name="search">Search
                        <i className="material-icons left">search</i>
                    </button>
                </div>
        </form>

    );

}

export default Form;