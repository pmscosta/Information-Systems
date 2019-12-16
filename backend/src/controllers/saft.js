'use strict';

const SafT = require('../models/saft');
const fs = require('fs');
const parser = require('../api/parser/parser');

async function parseFields(xml2js) {
  await parser.parseCustomers(xml2js);

  await parser.parseInvoices(xml2js);
}

function addSaft(req, res) {
  let file = fs.readFileSync(req.file.path);

  parser
    .parseXML(file)
    .catch(console.error)
    .then(async result => {
      let newSafT = new SafT({
        type: req.file.mimetype,
        data: result,
      });
      // newSafT.save()
      //   .catch(res.send);

      await parseFields(result);

      res.json('Done');
    })
    .catch(err => res.status(400).json(err));
}

module.exports = {
  addSaft,
};
