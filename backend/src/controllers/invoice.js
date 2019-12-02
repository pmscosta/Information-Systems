'use strict';

const Invoice = require('../models/invoice');

function getAll(req, res) {
  Invoice.find()
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

function getTotalSales(req, res) {
  Invoice.aggregate([
    // { $match: { time: {$gte: a, $lte: tomorrow} } },
    { $group: { _id: 0, TotalSalesValue: { $sum: "$netTotal" } } }
  ])
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

function addInvoice(req, res) {
  let newInvoice = new Invoice(req.body);

  newInvoice.save((err, invoice) => {
    if (err) {
      res.send(err);
    }
    res.json(invoice);
  });
}

module.exports = {
  getAll,
  addInvoice,
  getTotalSales
};
