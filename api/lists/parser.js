const parser = require('xml2js');
const fs = require('fs');

 

 function getJSON(pathToFile, callback) {
        fs.readFile(pathToFile, 'utf8', function(err, data) {
            if (err) throw err;
            parser.parseString(data, callback);
    });
}

const getXMLtoJSON = (path) => {
    return new Promise((resolve, reject) => {
        getJSON(path, resolve)
    })
}

getXMLtoJSON('./saft_t.xml').then(variable => muyglobal = variable);
    

exports.modules = muyglobal;
