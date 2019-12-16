'use strict';

const Invoice = require('../models/invoice');

const InvoiceProduct = require('../models/invoiceProduct');

function getAll(req, res) {
  Invoice.find()
    .then(invoices => {
      const promises = [];

      invoices.forEach(invoice => {
        const p = new Promise(resolve => {
          InvoiceProduct.find({
            _id: { $in: invoice.invoiceProducts },
          }).then(prods => resolve({ invoice, prods }));
        });
        promises.push(p);
      });

      Promise.all(promises).then(values => {
        res.json(values);
      });
    })

    .catch(err => res.status(400).json(err));
}

function getTotalSales(req, res) {
  Invoice.aggregate([
    // { $match: { time: {$gte: a, $lte: tomorrow} } },
    { $group: { _id: 0, TotalSalesValue: { $sum: '$netTotal' } } },
  ])
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

function addInvoice(req, res) {
  const newInvoice = new Invoice(req.body);

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
  getTotalSales,
};
