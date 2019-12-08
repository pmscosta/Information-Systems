'use strict';

const Customer = require('../models/customer');
const Invoice = require('../models/invoice');

function getAll(req, res) {
  Customer.find()
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
}

async function getTopClients(req, res) {
  let topCustomer = {
    customer: null,
    totalSpent: -Infinity
  };

  const customers = await Customer.find();

  for(const customer of customers) {
    const invoices = await Invoice.find({ customer: customer._id });
    
    let totalSpent = 0;

    for(const i of invoices) {
      totalSpent += i.netTotal;
    }

    if(topCustomer.totalSpent < totalSpent) {
      topCustomer = { customer, totalSpent };
    }
  }

  res.json(topCustomer);
}

function getByIdApi(req, res) {
  Customer.find({CustomerID: req.params.id})
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
}

function getById(id) {
   return Customer.findOne({CustomerID: id});
}

module.exports = {
  getAll,
  getById,
  getTopClients
};
