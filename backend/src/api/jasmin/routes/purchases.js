'use strict';

const axios = require('axios');
const jasminOptions = require('../consts');
const refreshToken = require('../token');

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

const getPurchaseInvoices = () => {
  return axios
    .get(`${jasminOptions.baseUrlRequest}/invoiceReceipt/invoices`)
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
  getPurchaseOrders,
  getPurchaseInvoices,
};
