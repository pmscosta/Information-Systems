'use strict';

const SafT = require('../models/saft');
const fs = require('fs');
const parser = require('../api/parser/parser');

async function parseFields(xml2js) {
  await parser.parseCustomers(xml2js);

  await parser.parseInvoices(xml2js);
}

function getAll(req, res) {
  SafT.find()
    .then(saft => res.json(saft))
    .catch(err => res.status(400).json(err));
}

function addSaft(req, res) {
  let file = fs.readFileSync(req.file.path);

  parser
    .parseXML(file)
    .catch(console.error)
    .then(async result => {

      let dates = parser.parseDate(result)


      let newSafT = new SafT({
        type: req.file.mimetype,
        // data: "",
        startDate: dates[0],
        endDate: dates[1]
      });


      SafT.findOne({ startDate: dates[0], endDate: dates[1] }, function (err, list) {
        if (err) { console.error(err); }
        if (!list) {
          newSafT.save();
          parseFields(result);
          res.json('Done');
        }
        else {
          res.json('Saft for this period already exists');
        }
      })
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
  getAll,
  addSaft,
};
