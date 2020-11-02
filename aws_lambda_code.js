const axios = require('axios');
const qs = require('qs');
const AWS = require('aws-sdk');

let instagramAccounts = [];

const checkIfInteger = (val) => {
    return /^\d+$/.test(val);
}

const getInstagramAccountURL = (account) => {
    return `https://www.instagram.com/${account}/?__a=1`
}

const getInstagramAccountsFiltered = (sessionId, urls, min_followers, max_followers) => {
    
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

        return entries.filter((entry)=>{

            if (!!entry.data.graphql.user){
                return entry.data.graphql.user.edge_followed_by.count >=  min_followers && entry.data.graphql.user.edge_followed_by.count <= max_followers;
            } else {
                return false;
            }
            
        }).map((entry)=>{
            
            return !!entry.data.graphql.user ? {
                id: entry.data.graphql.user.id,
                username: entry.data.graphql.user.username,
                count_follow: entry.data.graphql.user.edge_follow.count,
                count_followed_by: entry.data.graphql.user.edge_followed_by.count,
                is_business_account: entry.data.graphql.user.is_business_account,
                business_category_name: entry.data.graphql.user.business_category_name,
                business_email: entry.data.graphql.user.business_email,
                external_url: entry.data.graphql.user.external_url,
                profile_pic_url: entry.data.graphql.user.profile_pic_url,
                profile_pic_url_hd: entry.data.graphql.user.profile_pic_url_hd,
            }:{};
            
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
        
            return entry.data.data.user.edge_chaining.edges.map(node => node.node);
            
        })
    });
    
    return responses;
}

const getPageIdsFromAdLibrary = async(accounts) => {

    const data = qs.stringify({
        '__a': '1',
        'fb_dtsg': 'AQG3UP9GGdUG:AQG5gazDEQSB' 
    });
  
    //Perform parallel POST requests.
    const promises = accounts.map((account) => axios(
        {
            method: 'post',
            url: `https://www.facebook.com/ads/library/async/search_typeahead/?ad_type=all&q=${account.username}`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        }
    ));

    //Ensures that all POST requests are completed before moving on to the next part of the code.
    let responses = await Promise.all(promises).then((entries) => {
        return entries.map((entry)=>{
            let cleansed_response = entry.data.replace("for (;;);", "");
            let pageResults = JSON.parse(cleansed_response).payload.pageResults;
            return (Array.isArray(pageResults) && pageResults.length) ? pageResults[0] : {status: 400, message: "Entity cannot be found."};
        })
    });
    
    return responses;

};

const getPageAdCountFromAdLibrary = async(accounts) => {

    const data = qs.stringify({
        '__a': '1',
        'fb_dtsg': 'AQE5IVV3vh8G:AQFcmx4WDEgx' 
    });
  
    //Perform parallel POST requests.
    const promises = accounts.map((account) => axios(
        {
            method: 'post',
            url: `https://www.facebook.com/ads/library/async/search_ads/?view_all_page_id=${account.id}`,
            headers: { 
              'sec-fetch-site': 'same-origin', 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
        }
    ));

    //Ensures that all POST requests are completed before moving on to the next part of the code.
    let responses = await Promise.all(promises).then((entries) => {
        return entries.map((entry)=>{
            let cleansed_response = entry.data.replace("for (;;);", "");
            let parsed_response = JSON.parse(cleansed_response);
            return !!parsed_response.payload.totalCount ? parsed_response.payload.totalCount : 0;
        })
    });
    
    return responses;

};

exports.handler = async(event) => {
    
    let relatedProfilesURLs=[];
    let urls = [getInstagramAccountURL(event.username)];
    
    let min_followers = checkIfInteger(event["min_followers"]) ? +event["min_followers"]:0;
    let max_followers = checkIfInteger(event["max_followers"]) ? +event["max_followers"]:Number.MAX_SAFE_INTEGER;

    const accounts = await getInstagramAccountsFiltered(event["sessionId"], urls, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    
    if (Object.keys(accounts[0]).length === 0 && accounts[0].constructor === Object) {
        return {status: 200, message: "The entity doesn't exists." }
    }
    const accountIds = accounts.map(account => account.id);
    const relatedProfilesCollection = await getRelatedProfiles(accountIds, event["sessionId"], event["query_hash"]);
    
    relatedProfilesCollection.map(relatedProfiles => {
        relatedProfiles.map(relatedProfile => {
            relatedProfilesURLs.push(getInstagramAccountURL(relatedProfile.username));
        })
    })

    const profilesFromIG = await getInstagramAccountsFiltered(event["sessionId"], relatedProfilesURLs, min_followers, max_followers);
    const profilesFromFbAd = await getPageIdsFromAdLibrary(profilesFromIG);
    const storeCounts = await getPageAdCountFromAdLibrary(profilesFromFbAd);
    
    return profilesFromIG.map((profile, index) => {
        return {
            id: profile.id,
            username: profile.username,
            count_follow: profile.count_follow,
            count_followed_by: profile.count_followed_by,
            is_business_account: profile.is_business_account,
            business_category_name: profile.business_category_name,
            business_email: profile.business_email,
            external_url: profile.external_url,
            profile_pic_url: profile.profile_pic_url,
            profile_pic_url_hd: profile.profile_pic_url_hd,
            ad_count: storeCounts[index]
        }
    })
                
}


