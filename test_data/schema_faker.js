const jsf  = require('json-schema-faker');
const schema = require('./data/heal-schema.json');
const convertToDataverse = require("./src/convertToDataverse.js")
const uploadDataverse = require("./src/uploadToDataverse.js")

jsf.extend("faker", () => require("faker"));
//jsf.option("reuseProperties", true);
//jsf.option("alwaysFakeOptionals", true);
jsf.option('fillProperties', false);


test = jsf.generate(schema)
dvJSON = convertToDataverse(test)
uploadDataverse(dvJSON, process.env.DATAVERSE_KEY)
