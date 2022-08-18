const healToDataverse = (input)=>{
    var output = new Object;
    output.metadataBlocks = new Object;
    output.metadataBlocks.citation = { fields: new Object };
    output.metadataBlocks.heal = { fields: new Object };

    var citation = output.metadataBlocks.citation.fields;
    var heal = output.metadataBlocks.heal.fields;

    // Copy heal metadata block as closely as possible
    Object.keys(input).forEach(function(key) {
        heal[key] = {
            typeName: key,
            typeClass: "compound",
            multiple: false,
            value: new Object
        };
        Object.keys(input[key]).forEach(function(key_2) {
            heal[key]['value'][key_2] = {
                typeName: key_2,
                multiple: false,
            };
            if (typeof input[key][key_2] == "string") {
                heal[key]['value'][key_2].typeClass = "primitive";
                heal[key]['value'][key_2].multiple = false;
            } else if (typeof input[key][key_2] == "object") {
                //heal[key_2].typeClass = "compound"
                heal[key]['value'][key_2].multiple = true;
            }
            heal[key]['value'][key_2]['value'] = input[key][key_2];
        })
    });

    /*
    input.citation.investigators.forEach(function(investigator) {
       new_investigator = {
           authorName: investigator.
    }
    });
    citation.
    */

    return output;
}
