'use strict';

const router = require('express').Router();

router.get('/', function(req, res) {
  return res.json('hello');
});

module.exports = router;
