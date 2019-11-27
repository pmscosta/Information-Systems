'use strict';

const router = require('express').Router();
const purchases = require('../jasmin/purchases');

router.get('/billing', (req, res) => {
  purchases.getPurchaseOrders().then(data => res.json(data));
});

module.exports = router;
