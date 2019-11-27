const xml2js = require('xml2js');
const fs = require('fs');

const parser = new xml2js.Parser();

class Customer {
    constructor(CustomerTaxID, CompanyName, BillingAddress, Telephone){
        this.CustomerTaxID = CustomerTaxID;
        this.CompanyName = CompanyName;
        this.BillingAddress = BillingAddress;
        this.Telephone = Telephone;
    }
}

class Address {
    constructor(StreetName, AddressDetail, City, PostalCode, Region, Country){
        this.StreetName = StreetName;
        this.AddressDetail = AddressDetail;
        this.City = City;
        this.PostalCode = PostalCode;
        this.Region = Region;
        this.Country = Country;
    }
}

class Product {
    constructor(ProductType, ProductCode, ProductDescription){
        this.ProductType = ProductType;
        this.ProductCode = ProductCode;
        this.ProductDescription = ProductDescription;
    }
}

class InvoiceProduct {
    constructor(ProductCode, ProductDescription, Quantity, UnitPrice){
        this.ProductCode = ProductCode;
        this.ProductDescription = ProductDescription;
        this.Quantity = Quantity;
        this.UnitPrice = UnitPrice;
    }
}

class Invoice {
    constructor(InvoiceNo, InvoiceDate, InvoiceType, InvoiceProducts, TaxPayable, NetTotal, GrossTotal){
        this.InvoiceNo = InvoiceNo;
        this.InvoiceDate = InvoiceDate;
        this.InvoiceType = InvoiceType;
        this.InvoiceProducts = InvoiceProducts;
        this.TaxPayable = TaxPayable;
        this.NetTotal = NetTotal;
        this.GrossTotal = GrossTotal;
    }
}

const getCompanyName = (pathToFile) => {
    fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            console.log(result.AuditFile.Header[0].CompanyName[0]);
        });
    });
}

const getCustomers = (pathToFile) => {
    fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            result.AuditFile.MasterFiles[0].Customer.forEach(customer => {
                const billingAddr = new Address(customer.BillingAddress[0].StreetName[0], customer.BillingAddress[0].AddressDetail[0], customer.BillingAddress[0].City[0], customer.BillingAddress[0].PostalCode[0],customer.BillingAddress[0].Region[0], customer.BillingAddress[0].Country[0]);
                const cust = new Customer(customer.CustomerTaxID[0], customer.CompanyName[0], billingAddr, customer.Telephone[0]);
                console.log(cust);
            });
        });
    });
}

const getProducts = (pathToFile) => {
    fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            result.AuditFile.MasterFiles[0].Product.forEach(product => {
                const prod = new Product(product.ProductType[0], product.ProductCode[0], product.ProductDescription[0]);
                console.log(prod);
            });
        });
    });
}

const getInvoices = (pathToFile) => {
    fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) throw err;
        parser.parseString(data, (err, result) => {
            if (err) throw err;
            result.AuditFile.SourceDocuments[0].SalesInvoices[0].Invoice.forEach(invoice => {
                const invoice_products = [];
                invoice.Line.forEach(line => {
                    invoice_products.push(new InvoiceProduct(line.ProductCode[0], line.ProductDescription[0], line.Quantity[0], line.UnitPrice[0]));
                });

                const invoi = new Invoice(invoice.InvoiceNo[0], invoice.InvoiceDate[0], invoice.InvoiceType[0], invoice_products, invoice.DocumentTotals[0].TaxPayable[0], invoice.DocumentTotals[0].NetTotal[0], invoice.DocumentTotals[0].GrossTotal[0]); 
                console.log(invoi);
            })
            
        });
    });
}

getInvoices('./saft_2items.xml');
    

