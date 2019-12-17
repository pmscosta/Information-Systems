'use strict';

const multer = require('multer');
const router = require('express').Router();
const saft = require('../../controllers/saft');

const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('xmlFile'), saft.addSaft);
router.get('/', saft.getAll);

module.exports = router;
