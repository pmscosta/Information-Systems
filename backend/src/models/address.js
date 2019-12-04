'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
  StreetName: {
    type: String,
  },
  AddressDetail: {
    type: String
  },
  City: {
    type: String
  },
  PostalCode: {
    type: String
  },
  Region: {
    type: String
  },
  Country: {
    type: String
  }
});

const Address = mongoose.model('address', addressSchema);
module.exports = Address;
