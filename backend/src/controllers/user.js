'use strict';

const User = require('../models/user');

function getAll(req, res) {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports = {
  getAll,
};
