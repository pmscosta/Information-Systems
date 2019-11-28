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
      const apiToken = 'Bearer '.concat(jsonData.access_token);
      const expires = jsonData.expires_in;
      const tokenType = jsonData.token_type;

      console.log(
        `bearer_token= ${apiToken}\nexpires in = ${expires},\ntoken_type = ${tokenType}`,
      );
      // eslint-disable-next-line dot-notation
      axios.defaults.headers.common['Authorization'] = apiToken;
    })
    .catch(err => console.log(err));
};

module.exports = refreshToken;
