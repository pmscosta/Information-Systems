'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const refreshToken = require('../api/jasmin/token');
const userRouter = require('../api/routes/user');

module.exports = app => {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());

  app.use('/api/user', userRouter);

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
