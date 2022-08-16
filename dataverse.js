const host = "https://data.qdr.syr.edu";
const path = "/api/datasets/:persistentId/?persistentId=doi:10.5064/F6TZKMDU"
const url = host.concat(path)
var metadata;

https.get("https://data.qdr.syr.edu/api/datasets/:persistentId/?persistentId=doi:10.5064/F6TZKMDU", res => {

    let rawData = ''

    res.on('data', chunk => {
        rawData += chunk
    })

    res.on('end', () => {
        metadata = JSON.parse(rawData)
    })

})
