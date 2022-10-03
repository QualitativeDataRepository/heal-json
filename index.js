#!/usr/bin/env node

const dataverseToHEAL = require('./src/downloadFromDataverse.js');
const uploadDataverse = require('./src/uploadToDataverse.js');
const healToDataverse = require('./src/convertToDataverse.js');
const outputJSON = require('./src/output.js')

const args = process.argv.slice(2);
if (args.length == 0) {
    console.log("Error: no argument specified");
    console.log("Usage: ".concat(process.argv[1].concat(" <pid> <api key>")));
    console.log("Usage: ".concat(process.argv[1].concat(" <heal.json> <api key>")));

} else {
    if (args[0].substring(0, 4) == "doi:") {
        dataverseToHEAL(args[0], args[1], outputJSON);
    } else {
        const  path = require('path');
        let absolute_arg = path.resolve(args[0]);
        const input_json = require(absolute_arg);
        const dataverseJSON = healToDataverse(input_json);
        uploadDataverse(dataverseJSON, args[1])
    }
}
