'use strict';

const router = require('express').Router();
const customer = require('../../controllers/customer');

router.get('/', customer.getAll);
router.get('/topclient', customer.getTopClients);

module.exports = router;
