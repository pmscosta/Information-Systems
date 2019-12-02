'use strict';

const SafT = require('../models/saft');
const fs = require('fs');
const parser = require('../api/parser/parser');


function parseFields(xml2js) {

  let parseFuncs = [parser.getInvoice];

  parseFuncs.forEach(parseFunc => {

    let list = parseFunc(xml2js);

    list.forEach(elem => {
      elem.save();
    });
  });
}

function addSaft(req, res) {

  let file = fs.readFileSync(req.file.path);

  parser.parseXML(file)
    .catch(console.error)
    .then((result) => {
      let newSafT = new SafT({ type: req.file.mimetype, data: result });
      newSafT.save()
        .catch(res.send);

      parseFields(result);

      res.json("Done");
    });
}


module.exports = {
  addSaft
};
