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
  InvoiceProduct.aggregate([
    {
      $project: {
        month: { $month: '$date' },
        year: { $year: '$date' },
        day: { $dayOfMonth: '$date' },
        date: 1,
        total: { $multiply: ['$quantity', '$unitPrice'] },
      },
    },
    // Sort everything (descending so highest price per day is on top)
    {
      $sort: {
        year: -1,
        month: -1,
        day: -1,
      },
    },
    {
      $group: {
        _id: {
          month: '$month',
          year: '$year',
          day: '$day',
          date: '$date',
        },
        date: { $first: '$date' },
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
