//const { __esModule } = require('json-schema-empty');
const generateHEAL = require('./dv_to_heal.js');
const outputJSON = require('./output.js');

var https = require('https');

const dataverseToHEAL = (pid, api)=>{

    options = {
        host: "data.stage.qdr.org",
        port: 443,
        path: encodeURI("/api/datasets/:persistentId/?persistentId=".concat(pid)),
        method: "GET"
    };

    if (typeof (api) !== 'undefined') {
        options.headers = { 'X-Dataverse-Key': api };
    }

    var req = https.request(options, res => {
        let rawData = '';
        res.on('data', chunk => {
            rawData += chunk
        });
        res.on('end', () => {
            outputJSON(generateHEAL(JSON.parse(rawData)));
        });
    });

    req.end()

}

module.exports = dataverseToHEAL
