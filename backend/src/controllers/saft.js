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

function getAll(req, res) {
  SafT.find()
    .then(saft => res.json(saft))
    .catch(err => res.status(400).json(err));
}

function addSaft(req, res) {
  const file = fs.readFileSync(req.file.path);

  parser
    .parseXML(file)
    .catch(console.error)
    .then(result => {
      const dates = parser.parseDate(result);

      const newSafT = new SafT({
        type: req.file.mimetype,
        // data: "",
        startDate: dates[0],
        endDate: dates[1],
      });

      SafT.findOne(
        { startDate: dates[0], endDate: dates[1] },
        (err, list) => {
          if (err) {
            console.error(err);
          }
          if (!list) {
            newSafT.save().then(() => {
              parseFields(result).then(() => {
                res.status(200).json('Done');
              });
            });
          } else {
            res
              .status(400)
              .json('Saft for this period already exists');
          }
        },
      );
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
  getAll,
  addSaft,
};
