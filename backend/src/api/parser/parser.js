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

const getCustomers = (xml2js) => {

    const customersList = [];

    xml2js.AuditFile.MasterFiles[0].Customer.forEach(customer => {

        const cust = new Customer(
            {
                CustomerTaxID: customer.CustomerTaxID[0],
                CompanyName: customer.CompanyName[0]
            }
        );

        customersList.push(cust);
    });

    return customersList;
}

const getProducts = (xml2js) => {
    let productsList = [];

    xml2js.AuditFile.MasterFiles[0].Product.forEach(product => {
        const prod = new Product(product.ProductType[0], product.ProductCode[0], product.ProductDescription[0]);
        productsList.push(prod);
    });

    return productsList;
}

const getInvoices = (xml2js) => {

    let invoicesList = [];

    xml2js.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice.forEach(invoice => {

        const query = CustomerController.getById(invoice.CustomerID[0]);
       
        const newInvoice = new Invoice(
            {
                invoiceNo: invoice.InvoiceNo[0],
                invoiceType: invoice.InvoiceType[0],
                invoiceDate: invoice.InvoiceDate[0],
                netTotal: invoice.DocumentTotals[0].NetTotal[0]
            }
        );
        
        
        console.log(query);

        query
        .then((customer, res) => {
            console.log(customer);
            newInvoice.customer.push(customer);
            console.log(res)
        }).catch(
            err => res.status(400).json(err)
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

            newInvoice.invoiceProducts.push(newProductInvoice);
            invoicesList.push(newProductInvoice);
        });


        invoicesList.push(newInvoice);
    })
    
    return invoicesList;
}


module.exports = {
    parseXML,
    getInvoices,
    getProducts,
    getCustomers
};

