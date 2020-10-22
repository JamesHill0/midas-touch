const axios = require('axios');
const AWS = require('aws-sdk');

let instagramAccounts = [];

const getInstagramAccountURL = (account) => {
    
    return `https://www.instagram.com/${account}/?__a=1`
    
}

const getInstagramAccounts = (sessionId, urls) => {
    
    //Perform parallel GET requests.
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

const getRelatedProfiles = async (instagram_ids, sessionId, query_hash) => {
    
    //Perform parallel GET requests.
    const promises = instagram_ids.map((instagram_id) => axios(
        {
            method: 'get',
              url: `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables=%7B%22user_id%22%3A%22${instagram_id}%22%2C%22include_chaining%22%3Atrue%2C%22include_reel%22%3Atrue%2C%22include_suggested_users%22%3Afalse%2C%22include_logged_out_extras%22%3Afalse%2C%22include_highlight_reels%22%3Atrue%2C%22include_live_status%22%3Atrue%7D`,
              headers: { 
                Cookie: `sessionid=${sessionId}`,
              }
        }
        
    ));
    
    //Ensures that all GET requests are completed before moving on to the next part of the code.
    let responses = await Promise.all(promises).then((entries) =>{
        
        return entries.map((entry)=>{
            return entry.data.data.user.edge_chaining.edges;
        })
    });
    

    return responses;
}

exports.handler = async(event) => {
    
    let depth = 1;
    
    //sessionId=3663508345%3AqBRYTLII84qSUu%3A21
    
    //Array of urls to be subjected to requests.
    // let urls = [getInstagramAccountURL("jollibee")];
    
    // let accounts = await getInstagramAccounts(event["sessionId"], urls);
    
    // instagramAccounts.push(...accounts);
    
    return await getRelatedProfiles(["349355403"],event["sessionId"],event["query_hash"]);


}


