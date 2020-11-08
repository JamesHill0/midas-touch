import React from 'react';
import classes from './TableResults.module.css';
import Aux from "../../hoc/Auxilliary";
import { CSVLink } from "react-csv";

const TableResults = (props) => {

    const generateTable = (results) => (
        results.map((result) => {
            return (
            <tr key={result.id}>
                <td>{result.username}</td>
                <td>{result.count_follow}</td>
                <td>{result.count_followed_by}</td>
                <td>{result.is_business_account.toString()}</td>
                <td>{result.business_category_name}</td>
                <td>{result.business_email}</td>
                <td>{result.ad_count}</td>
                <td>
                    <a href={result.external_url}>
                        <img className={classes.tableResultPic} src={result.profile_pic_url} alt={result.external_url}/>
                    </a>
                </td>
            </tr>
            )
        })
    );

    return(
        <Aux>
            <div className="row">
                <CSVLink className={`btn-floating right ${classes.downloadButton}`} data={props.results} filename={"midas-results.csv"}><i class="material-icons">get_app</i></CSVLink>
            </div>
            <div className="row">
                <table className={`responsive-table centered highlight ${classes.tableResult}`} >
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Following</th>
                            <th>Followed By</th>
                            <th>Is Business Account</th>
                            <th>Business Category Name</th>
                            <th>Business Email</th>
                            <th>Ad Count</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable(props.results)}
                    </tbody>
                </table>
            </div>
        </Aux>
    );
};

export default TableResults;