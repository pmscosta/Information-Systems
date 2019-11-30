'use strict';

const SafT = require('../models/saft');
const fs = require('fs');

function addSaft(req, res) {

  let newSafT = new SafT({type: req.file.mimetype, data: fs.readFileSync(req.file.path)});

  newSafT.save((err, data) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
}

module.exports = {
  addSaft
};
