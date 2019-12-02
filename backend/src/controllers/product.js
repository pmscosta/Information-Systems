'use strict';

const Invoice = require('../models/invoice');
const InvoiceProduct = require('../models/invoiceProduct');

function getAll(req, res) {
  InvoiceProduct.find()
    .then(invoiceProduct => res.json(invoiceProduct))
    .catch(err => res.status(400).json(err));
}

function getAllTest(req, res) {
  Invoice.find()
    .populate('invoiceProducts')
    .exec(function (err, invoices) {
      res.json(invoices)
    });

  // Invoice.find({ "netTotal": { "$gte": 5 } })
  //   .select({ "_id": 0 })
  //   .populate('invoiceProducts')
  //   .populate({
  //     path: 'invoiceProducts',
  //     match: { age: { $gte: 21 } },
  //     // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
  //     select: 'name -_id',
  //     options: { limit: 5 }
  //   }).
  //   .exec(function (err, invoices) {
  //     res.json(invoices);
  //   })
}

module.exports = {
  getAll,
  getAllTest
};
