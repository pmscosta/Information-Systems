'use strict';

const router = require('express').Router();
const product = require('../../controllers/product');

router.get('/', product.getAllTest);

module.exports = router;
