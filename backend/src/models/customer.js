'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
  CustomerID: {
    type: String,
    required: true
  },
  CustomerTaxID: {
    type: String,
    required: true
  },
  CompanyName: {
    type: String
  }
});

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
