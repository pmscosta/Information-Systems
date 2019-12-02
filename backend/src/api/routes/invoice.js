'use strict';

const router = require('express').Router();
const invoice = require('../../controllers/invoice');


router.get('/', invoice.getAll);
router.get('/totalsales', invoice.getTotalSales)

router.post('/', invoice.addInvoice); 

module.exports = router;
