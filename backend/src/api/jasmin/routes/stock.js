'use strict';

const axios = require('axios');
const jasminOptions = require('../consts');
const refreshToken = require('../token');

const getMaterialItems = () => {
  return axios
    .get(
      `${jasminOptions.baseUrlRequest}/materialscore/materialsitems`,
    )
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
  getMaterialItems,
};
