'use strict';

const axios = require('axios');
const jasminOptions = require('../consts');
const refreshToken = require('../token');

axios.defaults.headers.common.Authorization = jasminOptions.apiToken;

const getBillingInvoices = () => {
  // get the jasmin api token
  return axios
    .get(`${jasminOptions.baseUrlRequest}/billing/invoices/`)
    .then(res => {
      console.log(res.data[0]);
      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('API REQUEST FAILED!\n WILL REFRESH TOKEN');
      refreshToken();
      return null;
    });
};

const getPurchaseOrders = () => {
  return axios
    .get(`${jasminOptions.baseUrlRequest}/purchases/orders?`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
      console.log('API REQUEST FAILED!\n WILL REFRESH TOKEN');
      refreshToken();
      return null;
    });
};

module.exports = { getBillingInvoices, getPurchaseOrders };
