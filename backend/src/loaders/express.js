'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jasminRouter = require('../api/routes/jasmin');

const invoiceRouter = require('../api/routes/invoice');
const customerRouter = require('../api/routes/customer');
const saftRouter = require('../api/routes/saft');
const productRouter = require('../api/routes/product');
const refreshToken = require('../api/jasmin/token');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());

  app.use('/api/invoice', invoiceRouter);
  app.use('/api/customer', customerRouter);
  app.use('/api/saft', saftRouter);
  app.use('/api/product', productRouter);
  app.use('/api/jasmin', jasminRouter);

  refreshToken();

  // Adding headers (CORS)
  app.use((_, res, next) => {
    // Allow connections for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Allowed request methods
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    // Allowed request headers
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, content-type, authorization',
    );
    // Because we need the website to include cookies in the requests sent
    // to the API (we are using sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Continue to next layer of middleware
    return next();
  });
};
