'use strict';

const axios = require('axios');
const jasminOptions = require('../consts');
const refreshToken = require('../token');

axios.defaults.headers.common.Authorization = jasminOptions.apiToken;

const getBillingInvoices = () => {
  // get the jasmin api token
  axios
    .get(`${jasminOptions.baseUrlRequest}/billing/invoices/`)
    .then(res => console.log(res.data[0].version))
    .catch(err => {
      console.log(err.data);
      console.log('API REQUEST FAILED!\n WILL REFRESH TOKEN');
      refreshToken();
    });
};

module.exports = getBillingInvoices;
