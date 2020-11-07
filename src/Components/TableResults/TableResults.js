import React from 'react';
import aux from '../../hoc/Auxilliary';
import Spinner from '../UI/Spinner/Spinner';
import classes from './TableResults.module.css';

const TableResults = (props) => {


    const generateTable = (results) => (
        results.map((result) => {
            return (
            <tr>
                <td>img</td>
                <td>{result.id}</td>
                <td>{result.username}</td>
                <td>{result.count_follow}</td>
                <td>{result.count_followed_by}</td>
                <td>{result.is_business_account}</td>
                <td>{result.business_category_name}</td>
                <td>{result.business_email}</td>
                <td>{result.external_url}</td>
                <td>{result.ad_count}</td>
            </tr>
            )
        })
    );

    return(
        <div className="row">
            {props.isLoading ? <Spinner/>:
                <table className="responsive-table" >
                <thead>
                    <tr>
                        <th>Profile Pic</th>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Following</th>
                        <th>Followed By</th>
                        <th>Is Business Account</th>
                        <th>Business Category Name</th>
                        <th>Business Email</th>
                        <th>URL</th>
                        <th>Ad Count</th>
                    </tr>
                    </thead>

                    <tbody>
                        {generateTable(props.results)}
                    </tbody>
                </table>
            
            }
        </div>
    );
};

export default TableResults;