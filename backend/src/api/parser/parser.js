const fs = require('fs');
const Invoice = require('../../models/invoice');
const InvoiceProduct = require('../../models/invoiceProduct');
const Customer = require('../../models/customer');
const CustomerController = require('../../controllers/customer');

const parser = require('xml2js');
const parseString = parser.parseString;


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


class Product {
    constructor(ProductType, ProductCode, ProductDescription) {
        this.ProductType = ProductType;
        this.ProductCode = ProductCode;
        this.ProductDescription = ProductDescription;
    }
}

const getCompanyName = (data) => {
    parser.parseString(data, (err, result) => {
        if (err) throw err;
        console.log(result.AuditFile.Header[0].CompanyName[0]);
    });
}

const parseCustomers = (xml2js) => {
    return Promise.all(xml2js.AuditFile.MasterFiles[0].Customer.map(async (customer) => {
        try {
            const result = await Customer.findOne({ CustomerID: customer.CustomerID[0] });

            if(result === null) {
                const cust = new Customer(
                    {
                        CustomerID: customer.CustomerID[0],
                        CustomerTaxID: customer.CustomerTaxID[0],
                        CompanyName: customer.CompanyName[0]
                    }
                );
    
                await cust.save();
            }
        } catch(error) {
            console.log(error);
        }
    }));
}

const getProducts = (xml2js) => {
    let productsList = [];

    xml2js.AuditFile.MasterFiles[0].Product.forEach(product => {
        const prod = new Product(product.ProductType[0], product.ProductCode[0], product.ProductDescription[0]);
        productsList.push(prod);
    });

    return productsList;
}

const parseInvoices = (xml2js) => {

    return new Promise((resolve, reject) => {
        xml2js.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice.forEach(invoice => {

            const newInvoice = new Invoice(
                {
                    invoiceNo: invoice.InvoiceNo[0],
                    invoiceType: invoice.InvoiceType[0],
                    invoiceDate: invoice.InvoiceDate[0],
                    netTotal: invoice.DocumentTotals[0].NetTotal[0]
                }
            );

            invoice.Line.forEach(line => {
                const newProductInvoice = new InvoiceProduct(
                    {
                        productCode: line.ProductCode[0],
                        productDescription: line.ProductDescription[0],
                        quantity: line.Quantity[0],
                        unitPrice: line.UnitPrice[0]
                    }
                );

                newProductInvoice.save();
                newInvoice.invoiceProducts.push(newProductInvoice);
            });

            CustomerController.getById(invoice.CustomerID[0])
                .then((customerdb) => {
                    newInvoice.customer = customerdb;
                    newInvoice.save();
                }).catch(err =>
                    res.status(400).json(err)
                );
        });
    });
}


module.exports = {
    parseXML,
    parseInvoices,
    getProducts,
    parseCustomers
};

