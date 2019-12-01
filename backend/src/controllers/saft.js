'use strict';

const SafT = require('../models/saft');
const fs = require('fs');
const parser = require('../api/parser/parser');

function addSaft(req, res) {


  let file = fs.readFileSync(req.file.path);

  let newSafT = new SafT({type: req.file.mimetype, data: file});

  parser.parseXML(file, parser.parseInvoiceTest)
    .catch(console.error)
    .then((list) => {
      // Save to database
      console.log(list);
    })

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
