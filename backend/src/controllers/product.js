'use strict';

const Invoice = require('../models/invoice');
const InvoiceProduct = require('../models/invoiceProduct');
const moment = require('moment');

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
    { $group: { _id: "$productCode", count: { $sum: 1 }, salesValue: { $sum: {$multiply: ["$quantity", "$unitPrice"] } } }},
    { $sort : { count : -1} }
  ])
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json(err));
}

const getSalesPerMonth = async (req, res) => {
  const salesPerMonth = [];

  try{
    for(let i = 1; i <= 12; i++){
      let monthTotal = 0;
      const monthStartDate = `${moment().year()}-${i}-1`;
      const nextMonthStartDate = i + 1 > 12? `${moment().year() + 1}-${1}-1` : `${moment().year()}-${i + 1}-1`;
      const aMonthWorthOfInvoices = await InvoiceProduct.find({ date: { $gte: monthStartDate, $lt:  nextMonthStartDate} });

      for(const invoice of aMonthWorthOfInvoices){
        monthTotal += invoice.quantity * invoice.unitPrice;
      }
      salesPerMonth.push(monthTotal);
    }

  } catch (err){
    console.error(err)
    err => res.status(400).json(err)
  }
  
  res.json(salesPerMonth);
}

module.exports = {
  getAll,
  getAllTest,
  getTopSoldProducts,
  getSalesPerMonth
};
