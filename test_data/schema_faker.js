/*
 * This script randomly generates synthetic HEAL data
 * Since I could not come across any HEAL json files in the wild
 *
 * This is useful for stress-testing the conversion script
 * Note: doesn't always generate data that satisfies the dataverse requirements
 * i.e. missing required fields
 * So it will need to be run multiple times to create data that is realistic
 * The important part is to check which errors are triggered.
 * If the errors are likely to be real-world errors, then they should be addressed
 */

const jsf  = require('json-schema-faker');
const schema = require('./data/heal-schema.json');
const convertToDataverse = require("./src/convertToDataverse.js")
const uploadDataverse = require("./src/uploadToDataverse.js")

jsf.extend("faker", () => require("faker"));
//jsf.option("reuseProperties", true);
/* I wanted to use this option below, but it starts generating random fields
 * HEAL data has a pretty strictly delimited set of fields
 * it's not realistic to start creating new arbitrary metadata fields */
//jsf.option("alwaysFakeOptionals", true);
jsf.option('fillProperties', false);


test = jsf.generate(schema) // create the fake data
dvJSON = convertToDataverse(test) // convert it to HEAL
/* and lastly, try uploading the synthetic data to dataverse
 * This is where you'll usually encounter errors */
uploadDataverse(dvJSON, process.env.DATAVERSE_KEY)
