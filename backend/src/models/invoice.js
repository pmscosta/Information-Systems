'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const invoiceSchema = new Schema({
  invoiceNo: {
    type: String,
    required: true
  },
  invoiceType: {
    type: String,
    required: true
  },
  invoiceDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;
