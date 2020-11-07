import React, { useState } from "react";
import Form from "../../Components/Forms/Form";
const axios = require("axios");

const Main = () => {

    const [fetchResults, setFetchResult] = useState({});

    return (
        <div className="container">
            <Form />
        </div>
    );

}

export default Main;