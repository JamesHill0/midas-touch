import React, { useState } from "react";
import Form from "../../Components/Forms/Form";
import TableResults from "../../Components/TableResults/TableResults";
import Spinner from "../../Components/UI/Spinner/Spinner";
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
            //console.log(response.data);
            // {
            //     "errorType": "TypeError",
            //     "errorMessage": "Cannot read property 'user' of undefined",
            //     "trace": [
            //         "TypeError: Cannot read property 'user' of undefined",
            //         "    at /var/task/index.js:35:38",
            //         "    at Array.filter (<anonymous>)",
            //         "    at /var/task/index.js:33:24",
            //         "    at runMicrotasks (<anonymous>)",
            //         "    at processTicksAndRejections (internal/process/task_queues.js:97:5)",
            //         "    at async Runtime.exports.handler (/var/task/index.js:163:22)"
            //     ]
            // }
            setFetchResult(response.data);
            activateLoading(false);
            disableSearchButton(false);
        }).catch(function (error) {
            console.log(error);
            console.log(JSON.stringify(error));
            setFetchResult(error);
            //{"message":"Network Error","name":"Error","stack":"Error: Network Error\n    at createError (http://localhost:3000/static/js/0.chunk.js:1040:15)\n    at XMLHttpRequest.handleError (http://localhost:3000/static/js/0.chunk.js:536:14)","config":{"url":"https://9tr1t1v7x1.execute-api.ap-southeast-1.amazonaws.com/Development/getinstagramaccounts1","method":"get","headers":{"Accept":"application/json, text/plain, */*"},"params":{"sessionId":"3663508345%3AWnVxoRWJ5fv0qz%3A15","query_hash":"d4d88dc1500312af6f937f7b804c68c3","username":"jollibee","max_followers":"1000000","min_followers":"200"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1}}
            activateLoading(false);
            disableSearchButton(false);
        });
    }

    return (
        <div className="container">
            <Form fetchResults={fetchResults} isSearchButtonDisabled={isSearchButtonDisabled} disableSearchButton={disableSearchButton}/>
            {(showTable) ? <TableResults isLoading={isLoading} results={results} /> : null }
        </div>
    );

}

export default Main;