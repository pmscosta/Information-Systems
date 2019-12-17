'use strict';

const SafT = require('../models/saft');
const fs = require('fs');
const parser = require('../api/parser/parser');

function parseFields(xml2js) {
  return new Promise(resolve => {
    parser.parseCustomers(xml2js).then(() => {
      parser.parseInvoices(xml2js).then(() => {
        resolve();
      });
    });
  });
}

function addSaft(req, res) {
  const file = fs.readFileSync(req.file.path);

  parser
    .parseXML(file)
    .catch(console.error)
    .then(result => {
      const newSafT = new SafT({
        type: req.file.mimetype,
        data: result,
      });
      parseFields(result).then(() => {
        res.status(200).json('Done');
      });
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
  addSaft,
};
