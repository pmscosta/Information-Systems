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
  },
  netTotal: {
    type: Number,
    required: true
  },
  invoiceProducts: [
    {type: Schema.Types.ObjectId, ref: 'invoiceProduct'}
  ],

  customer: [
    {type: Schema.Types.ObjectId, ref: 'customer', required: true}
  ]
});

const Invoice = mongoose.model('invoice', invoiceSchema);
module.exports = Invoice;
