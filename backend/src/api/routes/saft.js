'use strict';

const router = require('express').Router();
const saft = require('../../controllers/saft');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('xmlFile'), saft.addSaft); 

module.exports = router;
