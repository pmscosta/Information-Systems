'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({ 
  productType: {
    type: String
  },
  productCode: {
    type: String
  },
  productDescription: {
    type: String
  },
});


const Product = mongoose.model('product', productSchema);
module.exports = Product;
