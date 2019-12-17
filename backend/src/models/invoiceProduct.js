'use strict';

const mongoose = require('mongoose');
require('mongoose-moment')(mongoose);

const { Schema } = mongoose;

const invoiceProductSchema = new Schema({
  productCode: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const InvoiceProduct = mongoose.model(
  'invoiceProduct',
  invoiceProductSchema,
);
module.exports = InvoiceProduct;
