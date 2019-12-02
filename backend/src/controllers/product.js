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
}

function getTopSoldProducts(req, res) {

  InvoiceProduct.aggregate([
    // { $match: { time: {$gte: a, $lte: tomorrow} } },
    { $group: { _id: "$productCode", count: { $sum: 1 }, salesValue: { $sum: {$multiply: ["$quantity", "$unitPrice"] } } }},
    { $sort : { count : -1} }
  ])
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  getAll,
  getAllTest,
  getTopSoldProducts
};
