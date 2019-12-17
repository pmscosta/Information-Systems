/* eslint-disable no-underscore-dangle */

'use strict';

const Customer = require('../models/customer');
const Invoice = require('../models/invoice');

function getAll(req, res) {
  Customer.find()
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
}

async function getTopClients(req, res) {
  const orderedCustomers = [];

  const customers = await Customer.find();

  const promises = [];

  customers.forEach(customer => {
    const p = new Promise(resolve => {
      Invoice.find({ customer: customer._id }).then(invoices => {
        const totalSpent = invoices.reduce(
          (a, b) => a + b.netTotal,
          0,
        );
        const numItems = invoices.reduce(
          (a, c) => a + c.invoiceProducts.length,
          0
        )
        resolve({ customer, totalSpent, numItems });
      });
    });
    promises.push(p);
  });

  Promise.all(promises).then(values => {
    values.forEach(value => orderedCustomers.push(value));
    orderedCustomers.sort((a, b) => {
      return b.totalSpent - a.totalSpent;
    });
    res.json(orderedCustomers);
  });
}

function getByIdApi(req, res) {
  Customer.find({ CustomerID: req.params.id })
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
}

function getById(id) {
  return Customer.findOne({ CustomerID: id });
}

module.exports = {
  getAll,
  getById,
  getTopClients,
};
