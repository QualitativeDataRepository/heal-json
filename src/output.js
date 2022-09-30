const outputJSON = (json)=>{
    const pretty_print = JSON.stringify(json, null, 4);
    console.log(pretty_print);
}

module.exports = outputJSON