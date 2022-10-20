/* istanbul ignore file */

const uploadDataverse = (json, api)=> {
    var https = require('https');
    let post = JSON.stringify(json);

    options = {
        host: "data.stage.qdr.org",
        port: 443,
        path: encodeURI("/api/dataverses/heal/datasets"),
        method: "POST",
        headers: { 
            'X-Dataverse-Key': api,
            'Content-Type': 'application/json',
            'Content-Length': post.length
        }
    };

    var req = https.request(options, resp => {
        resp.on('data', function(d) {           
            process.stdout.write(d);  // working fine(prints decoded data in console)
        });
    }).on('error', function(e) {
        console.error(e);
    });

    req.write(post);
    req.end();
}

module.exports = uploadDataverse
