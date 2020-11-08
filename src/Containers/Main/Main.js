import React, { useState } from "react";
import Form from "../../Components/Forms/Form";
import TableResults from "../../Components/TableResults/TableResults";
import Spinner from "../../Components/UI/Spinner/Spinner";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
const axios = require("axios");

const Main = () => {

    const [results, setFetchResult] = useState({});
    const [isSearchButtonDisabled, disableSearchButton] = useState(true);
    const [isLoading, activateLoading] = useState(false);
    const [showTable, activateTable] = useState(false); 

    const fetchResults = (sessionId, query_hash, username, max_followers, min_followers) => {

        const config = {
            method: 'get',
            url: `https://9tr1t1v7x1.execute-api.ap-southeast-1.amazonaws.com/Development/getinstagramaccounts`,
            params: {sessionId, query_hash, username, max_followers, min_followers},
            headers: { }
        };

        activateTable(true);
        activateLoading(true);
        disableSearchButton(true);
        axios(config).then(function (response) {
            setFetchResult(response.data);
            activateLoading(false);
            disableSearchButton(false);
        }).catch(function (error) {
            setFetchResult(error);
            activateLoading(false);
            disableSearchButton(false);
        });
    }

    const generateResults = () => {

        if (isLoading) {
            return <Spinner />
        } else {
            if (results.name === "Error" || "errorType" in results) {
                return <ErrorMessage errorResults={results} />
            } else {
                return <TableResults results={results} />
            }
        }
    
    }

    return (
        <div className="container">
            <Form fetchResults={fetchResults} isSearchButtonDisabled={isSearchButtonDisabled} disableSearchButton={disableSearchButton}/>
            {(showTable) ? generateResults() : null }
        </div>
    );

}

export default Main;