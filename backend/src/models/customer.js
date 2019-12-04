'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
  CustomerTaxID: {
    type: String,
    required: true
  },
  CompanyName: {
    type: String
  },
  Address: [
      {type: Schema.Types.ObjectId, ref: 'address'}
    ]
  ,
  Telephone: {
    type: Number
  }
});

const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;
