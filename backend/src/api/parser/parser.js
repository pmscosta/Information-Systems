const fs = require('fs');
const Invoice = require('../../models/invoice');
const InvoiceProduct = require('../../models/invoiceProduct');

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



class Customer {
    constructor(CustomerTaxID, CompanyName, BillingAddress, Telephone) {
        this.CustomerTaxID = CustomerTaxID;
        this.CompanyName = CompanyName;
        this.BillingAddress = BillingAddress;
        this.Telephone = Telephone;
    }
}

class Address {
    constructor(StreetName, AddressDetail, City, PostalCode, Region, Country) {
        this.StreetName = StreetName;
        this.AddressDetail = AddressDetail;
        this.City = City;
        this.PostalCode = PostalCode;
        this.Region = Region;
        this.Country = Country;
    }
}

class Product {
    constructor(ProductType, ProductCode, ProductDescription) {
        this.ProductType = ProductType;
        this.ProductCode = ProductCode;
        this.ProductDescription = ProductDescription;
    }
}

// class InvoiceProduct {
//     constructor(ProductCode, ProductDescription, Quantity, UnitPrice) {
//         this.ProductCode = ProductCode;
//         this.ProductDescription = ProductDescription;
//         this.Quantity = Quantity;
//         this.UnitPrice = UnitPrice;
//     }
// }

// class Invoice {
//     constructor(InvoiceNo, InvoiceDate, InvoiceType, InvoiceProducts, TaxPayable, NetTotal, GrossTotal){
//         this.InvoiceNo = InvoiceNo;
//         this.InvoiceDate = InvoiceDate;
//         this.InvoiceType = InvoiceType;
//         this.InvoiceProducts = InvoiceProducts;
//         this.TaxPayable = TaxPayable;
//         this.NetTotal = NetTotal;
//         this.GrossTotal = GrossTotal;
//     }
// }

const getCompanyName = (data) => {
    parser.parseString(data, (err, result) => {
        if (err) throw err;
        console.log(result.AuditFile.Header[0].CompanyName[0]);
    });
}

const getCustomers = (data) => {
    parser.parseString(data, (err, result) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            result.AuditFile.MasterFiles[0].Customer.forEach(customer => {
                const billingAddr = new Address(customer.BillingAddress[0].StreetName[0], customer.BillingAddress[0].AddressDetail[0], customer.BillingAddress[0].City[0], customer.BillingAddress[0].PostalCode[0], customer.BillingAddress[0].Region[0], customer.BillingAddress[0].Country[0]);
                const cust = new Customer(customer.CustomerTaxID[0], customer.CompanyName[0], billingAddr, customer.Telephone[0]);
                console.log(cust);
            });
        });
    });
}

const getProducts = (xml2js) =>{
    let productsList = [];

    xml2js.AuditFile.MasterFiles[0].Product.forEach(product => {
        const prod = new Product(product.ProductType[0], product.ProductCode[0], product.ProductDescription[0]);
        productsList.push(prod);
    });

    return productsList;
}

const getInvoice = (xml2js) => {

    let invoicesList = [];

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

            newInvoice.invoiceProducts.push(newProductInvoice);
            invoicesList.push(newProductInvoice);
        });

       
        invoicesList.push(newInvoice);
    })

    return invoicesList;
}


module.exports = {
    parseXML,
    getInvoice,
    getProducts
};

