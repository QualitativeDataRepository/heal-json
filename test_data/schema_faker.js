const jsf  = require('json-schema-faker');
const schema = require('./data/heal-schema.json');
const convertToDataverse = require("./src/convertToDataverse.js")

jsf.option('fillProperties', false);
test = jsf.generate(schema)
convertToDataverse(test)
