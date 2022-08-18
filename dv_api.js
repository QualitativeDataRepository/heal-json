async function dataverseJSON(pid, api) {
    options = {
        host: "data.stage.qdr.org",
        port: 443,
        path: "/api/datasets/:persistentId/?persistentId=".concat(pid),
        method: "GET"
    };

    if (api !== null) {
        options.headers = { 'X-Dataverse-Key': api };
    }

    var req = await https.request(options, res => {
        let rawData = '';
        res.on('data', chunk => {
            rawData += chunk
        });
        res.on('end', () => {
            const metadata = JSON.parse(rawData);
        });
    });

    return metadata;
}
