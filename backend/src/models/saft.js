'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const saftSchema = new Schema({
    data: { type: String, required: true },
});

const Saft = mongoose.model('saft', saftSchema);
module.exports = Saft;
