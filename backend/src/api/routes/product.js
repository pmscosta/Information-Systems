'use strict';

const router = require('express').Router();
const product = require('../../controllers/product');

router.get('/', product.getAll);
router.get('/topSoldProducts', product.getTopSoldProducts);
router.get('/salesPerMonth', product.getSalesPerMonth);

module.exports = router;
