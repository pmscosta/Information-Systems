'use strict';

const moment = require('moment');
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
    .exec(function(err, invoices) {
      res.json(invoices);
    });
}

function getTopSoldProducts(req, res) {
  InvoiceProduct.aggregate([
    {
      $group: {
        _id: '$productCode',
        count: { $sum: 1 },
        salesValue: {
          $sum: { $multiply: ['$quantity', '$unitPrice'] },
        },
      },
    },
    { $sort: { count: -1 } },
  ])
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

const getSalesPerMonth = async (req, res) => {
  const salesPerMonth = [];

  // InvoiceProduct.findOne({}).then(inv => console.log(inv));

  InvoiceProduct.aggregate([
    {
      $project: {
        month: { $month: '$date' },
        year: { $year: '$date' },
        total: { $multiply: ['$quantity', '$unitPrice'] },
      },
    },
    {
      $group: {
        _id: {
          month: '$month',
          year: '$year',
        },
        total: { $sum: '$total' },
      },
    },
  ]).then(invoices => {
    res.json(invoices);
  });
};

module.exports = {
  getAll,
  getAllTest,
  getTopSoldProducts,
  getSalesPerMonth,
};
