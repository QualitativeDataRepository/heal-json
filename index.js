#!/usr/bin/env node

const dataverseToHEAL = require('./api/fromDataverse.js');
const uploadDataverse = require('./api/toDataverse.js');
const healToDataverse = require('./convert/toDataverse.js');
const outputJSON = require('./output.js');

const args = process.argv.slice(2);
if (args.length == 0) {
    console.log("Error: no argument specified");
    console.log("Usage: ".concat(process.argv[1].concat(" <pid> <api key>")));
    console.log("Usage: ".concat(process.argv[1].concat(" <heal.json> <api key>")));

} else {
    if (args[0].substring(0, 4) == "doi:") {
        const output = dataverseToHEAL(args[0], args[1]);
    } else {
        const  path = require('path');
        let absolute_arg = path.resolve(args[0]);
        const input_json = require(absolute_arg);
        const dataverseJSON = healToDataverse(input_json);
        uploadDataverse(dataverseJSON, args[1])
    }
}
