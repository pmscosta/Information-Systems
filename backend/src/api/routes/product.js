'use strict';

const router = require('express').Router();
const product = require('../../controllers/product');

router.get('/', product.getAll);

module.exports = router;
