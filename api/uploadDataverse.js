var https = require('https');

const uploadDataverse = (json, api)=> {

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

    var req = https.request(options, res => {
        console.log(res.statusMessage);
    });

    req.write(post);
    req.end();
}

module.exports = uploadDataverse