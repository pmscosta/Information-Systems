'use strict';

const Customer = require('../models/customer');

function getAll(req, res) {
  Customer.find()
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
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
  getById
};
