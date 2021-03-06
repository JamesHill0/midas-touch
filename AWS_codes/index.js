const http = require('http');
const axios = require('axios');
const qs = require('qs');

async function getPageIdFromAdLibrary(searchEntity) {

  let data = qs.stringify({
    '__a': '1',
   'fb_dtsg': 'AQG3UP9GGdUG:AQG5gazDEQSB' 
  });

  let config = {
    method: 'post',
    url: `https://www.facebook.com/ads/library/async/search_typeahead/?ad_type=all&q=${searchEntity}`,
    headers: { 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  const response = await axios(config);
  let cleansed_response = response.data.replace("for (;;);", "");
  let pageResults = JSON.parse(cleansed_response).payload.pageResults;
  return (Array.isArray(pageResults) && pageResults.length) ? pageResults[0] : {status: 400, message: "Entity cannot be found."};
};

async function getPageInfoFromAdLibrary(pageId) {

  let data = qs.stringify({
    '__a': '1',
   'fb_dtsg': 'AQE5IVV3vh8G:AQFcmx4WDEgx' 
  });

  const config = {
    method: 'post',
    url: `https://www.facebook.com/ads/library/async/search_ads/?view_all_page_id=${pageId}`,
    headers: { 
      'sec-fetch-site': 'same-origin', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };

  const response = await axios(config);
  let cleansed_response = response.data.replace("for (;;);", "");
  return JSON.parse(cleansed_response);

};

async function main() {

  let page = await getPageIdFromAdLibrary("wolfproject.co");
  let pageInfo = await getPageInfoFromAdLibrary(page.id);
  console.log(pageInfo);
  console.log(pageInfo.payload.totalCount);

}

main();



// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {


//     var axios = require('axios');

// // var config = {
// //   method: 'get',
// //   url: 'https://www.instagram.com/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables=%7B%22user_id%22%3A%22349355403%22%2C%22include_chaining%22%3Atrue%2C%22include_reel%22%3Atrue%2C%22include_suggested_users%22%3Afalse%2C%22include_logged_out_extras%22%3Afalse%2C%22include_highlight_reels%22%3Atrue%2C%22include_live_status%22%3Atrue%7D',
// //   headers: { 
// //     'Cookie': 'sessionid=3663508345%3AqBRYTLII84qSUu%3A21; ig_did=68F032C6-5785-4624-92AD-14263D837746; csrftoken=Ne9dOi29xgp4cOyspOERCFmaavG0v4RB; shbid=8453; mid=X4qY5AAEAAEG6LJwx4-Rln-xSiJQ; ds_user_id=3663508345; shbts=1603203100.0672386; rur=FTW; urlgen="{\\"112.201.121.215\\": 9299}:1kVYP5:Dx4O3-Iw-B58Mz_-S3K4R5thvkE"'
// //   }
// // };

//   var config = {
//     method: 'get',
//     url: 'https://www.instagram.com/microsoft/?__a=1',
//   };

//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });


//   console.log(`Server running at http://${hostname}:${port}/`);
// });