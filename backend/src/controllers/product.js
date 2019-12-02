'use strict';

const InvoiceProduct = require('../models/invoiceProduct');

function getAll(req, res) {
  InvoiceProduct.find()
    .then(invoiceProduct => res.json(invoiceProduct))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  getAll
};
