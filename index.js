#!/usr/bin/env node

const dataverseToHEAL = require('./src/downloadFromDataverse.js');
const uploadDataverse = require('./src/uploadToDataverse.js');
const healToDataverse = require('./src/convertToDataverse.js');
const outputJSON = require('./src/output.js')

const fs = require('fs')

const args = process.argv.slice(2);
if (args.length == 0) { // they didn't give any args
    console.log("Error: no argument specified");
    console.log("Usage: ".concat(process.argv[1].concat(" [pid] [api key]")));
    console.log("Usage: ".concat(process.argv[1].concat(" [heal.json] [api key]")));

} else { // if we have any arguments
    if (args[0].substring(0, 4) == "doi:") { // we detect a DOI as arg 1
        dataverseToHEAL(args[0], args[1], outputJSON);
    } else { // we assume they're going for the HEAL->dv option
        if (typeof args[1] == "undefined") { // but didn't give an api key
            console.log("Please specify an API key.")
            console.log("Usage: ".concat(process.argv[1].concat(" [heal.json] [api key]")));
        } else { // actually fulfilled all needed args
            const  path = require('path');
            let absolute_arg = path.resolve(args[0]);
            if (fs.existsSync(absolute_arg)) {
                const input_json = require(absolute_arg);
                const dataverseJSON = healToDataverse(input_json);
                uploadDataverse(dataverseJSON, args[1])
            } else {  // but the file doesn't exist
                console.log("Error not found: " + absolute_arg)
                console.log("Usage: ".concat(process.argv[1].concat(" [heal.json] [api key]")));
            }
        }
    }
}
