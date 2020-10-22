const axios = require('axios');
const AWS = require('aws-sdk');

let instagramAccounts = [];

const getInstagramAccountURL = (account) => {
    
    return `https://www.instagram.com/${account}/?__a=1`
    
}

const getInstagramAccounts = (sessionId, urls) => {
    
    //Perform parallel POST requests.
    const promises = urls.map(url => axios(
        {
            method: 'get',
            url: url,
            headers: { 
                Cookie: `sessionid=${sessionId}`,
                Accept: 'application/json, text/plain, */*',
            }
        }
        
    ));
    
    //Ensures that all GET requests are completed before moving on to the next part of the code.
    let responses = Promise.all(promises).then((entries) =>{
        return entries.map((entry)=>{
            
            const userData = entry.data.graphql.user;
            
            return {
                id: userData.id,
                username: userData.username,
                count_follow: userData.edge_follow.count,
                count_followed_by: userData.edge_followed_by.count,
                is_business_account: userData.is_business_account,
                business_category_name: userData.business_category_name,
                business_email: userData.business_email,
                external_url: userData.external_url,
                profile_pic_url: userData.profile_pic_url,
                profile_pic_url_hd: userData.profile_pic_url_hd,
                
            }
            
        });
    });
    
    return responses;
    
}

exports.handler = async(event) => {
    
    let depth = 2;

    //Array of urls to be subjected to requests.
    let urls = [getInstagramAccountURL('jollibee')];
    
    //sessionId=3663508345%3AqBRYTLII84qSUu%3A21
    let accounts = await getInstagramAccounts(event["sessionId"], urls);
    
    return accounts;

}


