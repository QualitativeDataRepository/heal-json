const host = "https://data.stage.qdr.org";
const path = "/api/datasets/:persistentId/?persistentId="
var pid = "doi:10.33564/FK2QRMOYP"

const url = host.concat(path).concat(pid)

var metadata;

https.get(url, res => {
    let rawData = ''
    res.on('data', chunk => {
        rawData += chunk
    })
    res.on('end', () => {
        metadata = JSON.parse(rawData)
    })
})
