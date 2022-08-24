const healToDataverse = (input)=>{
    var output = { datasetVersion: { metadataBlocks: {
            citation: { fields: new Array, displayName: "Citation Metadata" },
            heal: { fields: new Array, displayName: "HEAL metadata schema", name: "heal" }
    }}};

    const schema = require('../data/heal-schema.json');

    var citation = output.datasetVersion.metadataBlocks.citation.fields;
    var heal = output.datasetVersion.metadataBlocks.heal.fields;

    delete heal.registrants;

    // Copy heal metadata block as closely as possible
    Object.keys(input).forEach(function(key) {
    if (key !== "findings" && key !== "study_type" && key !== "study_translational_focus") { // TESTING FIELDS ONE BY ONE, REMOVE THIS
        // top level of each block in HEAL json
        let new_field = {
            typeName: key,
            typeClass: "compound",
            multiple: false,
            value: new Object
        };

        // second level of each block in HEAL json
        Object.keys(input[key]).forEach(function(key_2) {
            //console.log(key.concat(": ", key_2));
            if (key_2 !== "investigators" && key_2 !== "study_collections" && key !== "registrants") { // This data goes in the main dataverse citation block
            new_field.value[key_2] = {
                typeName: key_2,
                multiple: false,
            };

            new_field.value[key_2]['value'] = input[key][key_2];

            // start by handling simple strings
            if (schema['properties'][key]['properties'][key_2]['type'] == "string") {
                new_field.value[key_2].multiple = false;
                if (typeof schema['properties'][key]['properties'][key_2]['enum'] !== "undefined") {
                    new_field.value[key_2].typeClass = "controlledVocabulary";
                } else {
                    new_field.value[key_2].typeClass = "primitive";
                }
            } else if (schema['properties'][key]['properties'][key_2]['type'] == "integer") {
                new_field.value[key_2].typeClass = "primitive";
                new_field.value[key_2].multiple = false;
                new_field.value[key_2]['value'] = input[key][key_2].toString();
            
            // handling more complex objects
            } else if (schema['properties'][key]['properties'][key_2]['type'] == "array") {
                //heal[key_2].typeClass = "compound"
                if (schema['properties'][key]['properties'][key_2]['items']['type'] == "string") {
                    new_field.value[key_2].multiple = true;

                    // Is there controlled vocabulary?
                    if (typeof schema['properties'][key]['properties'][key_2]['items']['enum'] !== 'undefined') {
                        new_field.value[key_2].typeClass = "controlledVocabulary";
                    } else {
                        //new_field.value[key_2].multiple = false;
                        new_field.value[key_2].typeClass = "primitive";
                    }

                    // Does the array need to be flattened into a string?
                    /*if (input[key][key_2].length == 1) {
                        new_field.value[key_2].value = input[key][key_2][0];
                        //new_field.value[key_2].multiple = false;
                    } */
                }

            }

            // Change boolean to Yes/No strings
            if (schema['properties'][key]['properties'][key_2]['type'] == "boolean") {
                new_field.value[key_2].typeClass = "controlledVocabulary";
                if (input[key][key_2]) {
                    new_field.value[key_2].value = "Yes";
                } else {
                    new_field.value[key_2].value = "No";
                }
            }
        }
        })

        // reset "citation" to "heal_citation" for dataverse compatibility
        if (new_field.typeName == "citation") {
            new_field.typeName = "heal_citation"
        }

        heal.push(new_field);
    }
    });

    // Add the regular dataverse citation fields
    citation.push({ value: input.minimal_info.study_name,
        typeClass: "primitive", multiple: false, typeName: "title" });

    author = { value: new Array, typeClass: "compound", multiple: true, typeName: "author"};
    input.citation.investigators.forEach(function(investigator) {
        let new_investigator = {
            authorName: {
                value: investigator.investigator_first_name.concat(" ", investigator.investigator_last_name),
                typeClass: "primitive", multiple: false, typeName: "authorName"
            }
        };
        author.value.push(new_investigator);
    });
    citation.push(author);

    datasetContact = { value: new Array, typeClass: "compound", 
        multiple: true, typeName: "datasetContact" };
    input.contacts_and_registrants.contacts.forEach(function(contact) {
        let new_contact = {
            datasetContactEmail: {
                typeClass: "primitive",
                multiple: false,
                typeName: "datasetContactEmail",
                value: contact.contact_email
            },
            datasetContactName: {
                typeClass: "primitive",
                multiple: false,
                typeName: "datasetContactName",
                value: contact.contact_first_name.concat(" ", contact.contact_last_name)
            }
        };
        datasetContact.value.push(new_contact);
    });
    citation.push(datasetContact);

    dsDescription = { value : new Array, typeClass: "compound", 
        multiple: true, typeName: "dsDescription" };
    dsDescription.value.push({
        dsDescriptionValue: {
            value: input.minimal_info.study_description,
            multiple: false,
            typeClass: "primitive",
            typeName: "dsDescriptionValue"
        }
    });
    citation.push(dsDescription);

    subject = { value: new Array, typeClass: "controlledVocabulary", 
        multiple: true, typeName: "subject" };
    subject.value.push("Medicine, Health and Life Sciences");
    citation.push(subject);
    
    return output;
}

module.exports = healToDataverse;
