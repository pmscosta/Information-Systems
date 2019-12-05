'use strict';

const router = require('express').Router();
const invoice = require('../../controllers/invoice');


router.get('/', invoice.getAll);
router.get('/totalsales', invoice.getTotalSales);
router.get('/topclient', invoice.getTopClients);

router.post('/', invoice.addInvoice); 

module.exports = router;
