'use strict';

const moment = require('moment');
const parser = require('xml2js');
const Invoice = require('../../models/invoice');
const InvoiceProduct = require('../../models/invoiceProduct');
const Customer = require('../../models/customer');
const CustomerController = require('../../controllers/customer');

const { parseString } = parser;

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

const parseCustomers = xml2js => {
  return Promise.all(
    xml2js.AuditFile.MasterFiles[0].Customer.map(async customer => {
      try {
        const result = await Customer.findOne({
          CustomerID: customer.CustomerID[0],
        });

        if (result === null) {
          const cust = new Customer({
            CustomerID: customer.CustomerID[0],
            CustomerTaxID: customer.CustomerTaxID[0],
            CompanyName: customer.CompanyName[0],
          });

          await cust.save();
        }
      } catch (error) {
        console.error(error);
      }
    }),
  );
};


const parseDate = xml2js => {
  return [xml2js.AuditFile.Header[0].StartDate, xml2js.AuditFile.Header[0].EndDate];
};

const parseInvoices = xml2js => {
  return new Promise((resolve, reject) => {
    xml2js.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice.forEach(
      invoice => {
        const newInvoice = new Invoice({
          invoiceNo: invoice.InvoiceNo[0],
          invoiceType: invoice.InvoiceType[0],
          invoiceDate: invoice.InvoiceDate[0],
          netTotal: invoice.DocumentTotals[0].NetTotal[0],
          grossTotal: invoice.DocumentTotals[0].GrossTotal[0],
        });

        invoice.Line.forEach(line => {
          const newProductInvoice = new InvoiceProduct({
            productCode: line.ProductCode[0],
            productDescription: line.ProductDescription[0],
            quantity: line.Quantity[0],
            unitPrice: line.UnitPrice[0],
            date: moment(invoice.InvoiceDate[0]),
          });

          newProductInvoice.save();
          // createInvoiceProduct(newProductInvoice);
          newInvoice.invoiceProducts.push(newProductInvoice);
        });

        CustomerController.getById(invoice.CustomerID[0]).then(
          customerdb => {
            newInvoice.customer = customerdb;
            newInvoice.save();
            // createInvoice(newInvoice);
          },
        );
      },
    );
  });
};


const createInvoice = (invoice) => {

  let newInvoice = {
    invoiceNo: invoice.invoiceNo,
    invoiceType: invoice.invoiceType,
    invoiceDate: invoice.invoiceDate,
    netTotal: invoice.netTotal,
    invoiceProducts: invoice.invoiceProducts,
    customer: invoice.customer
  }

  Invoice.findOneAndUpdate(
    { invoiceNo: invoice.invoiceNo },
    newInvoice,
    { upsert: true, new: true, runValidators: true },
    function (err, doc) { // callback
      if (err) {
        console.error(err);
      } else {
        console.log(doc)
      }
    }
  );
}


const createInvoiceProduct = (invoiceProduct) => {

  let newInvoiceProduct = {
    productCode: invoiceProduct.productCode,
    productDescription: invoiceProduct.productDescription,
    quantity: invoiceProduct.quantity,
    unitPrice: invoiceProduct.unitPrice,
    date: invoiceProduct.date
  }

  InvoiceProduct.findOneAndUpdate(
    { productCode: invoiceProduct.productCode },
    newInvoiceProduct,
    { upsert: true, new: true, runValidators: true },
    function (err, doc) { // callback
      if (err) {
        console.error(err);
      } else {
        console.log(doc)
      }
    }
  );
}

module.exports = {
  parseXML,
  parseInvoices,
  parseCustomers,
  parseDate
};
