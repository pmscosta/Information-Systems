'use strict';

const axios = require('axios');
const qs = require('querystring');
const jasminOptions = require('./consts');

const refreshToken = () => {
  // get the jasmin api token
  axios
    .post(
      jasminOptions.jasminTokenUrl,
      qs.stringify({
        grant_type: 'client_credentials',
        client_id: jasminOptions.jasminClientID,
        client_secret: jasminOptions.jasminClientSecret,
        scope: 'application',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(res => {
      const jsonData = res.data;
      const bearerToken = 'Bearer '.concat(jsonData.access_token);
      const expires = jsonData.expires_in;
      const tokenType = jsonData.token_type;
      console.log(
        `bearer_token= ${bearerToken}\nexpires in = ${expires},\ntoken_type = ${tokenType}`,
      );
      jasminOptions.apiToken = bearerToken;
    })
    .catch(err => console.log(err));
};

module.exports = refreshToken;
