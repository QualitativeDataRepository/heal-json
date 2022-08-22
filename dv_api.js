const dataverseToHEAL = require('./dv_to_heal.js');
const pid = "doi:10.33564/FK2FXT0AX";
const api = "";

options = {
    host: "data.stage.qdr.org",
    port: 443,
    path: "/api/datasets/:persistentId/?persistentId=".concat(pid),
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
        console.log(JSON.stringify(dataverseToHEAL(JSON.parse(rawData))));
    });
});

req.end()