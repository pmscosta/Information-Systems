'use strict';

const axios = require('axios');
const jasminOptions = require('../consts');
const refreshToken = require('../token');

const getSalesReceivable = () => {
  return axios
    .get(
      `${jasminOptions.baseUrlRequest}/accountsReceivable/receipts`,
    )
    .then(res => {
      return res.data;
    });
};

const getSalesInvoices = () => {
  // get the jasmin api token
  return axios
    .get(`${jasminOptions.baseUrlRequest}/billing/invoices/`)
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

const getSalesOrders = () => {
  return axios
    .get(`${jasminOptions.baseUrlRequest}/sales/orders`)
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
module.exports = {
  getSalesInvoices,
  getSalesOrders,
  getSalesReceivable,
};
