const healToDataverse = (input)=>{
    var output = { datasetVersion: { metadataBlocks: {
            citation: { fields: new Array, displayName: "Citation Metadata" },
            heal: { fields: new Array, displayName: "HEAL metadata schema", name: "heal" }
    }}};

    const schema = require('../data/heal-schema.json');

    var citation = output.datasetVersion.metadataBlocks.citation.fields;
    var heal = output.datasetVersion.metadataBlocks.heal.fields;

    // Copy heal metadata block as closely as possible
    Object.keys(input).forEach(function(key) {
        // remove this when the DV block is fixed
        // except contacts and registrants, they're handled separately
        if (key !== "contacts_and_registrants" && key !== "findings" && key !== "study_translational_focus") { // TESTING FIELDS ONE BY ONE, REMOVE THIS
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
                if (key_2 !== "study_collections") { // remove this when the DV block is fixed
                new_field.value[key_2] = {
                    typeName: key_2,
                    multiple: false,
                };
                
                let field_schema = schema['properties'][key]['properties'][key_2];
                let field_type = field_schema.type;
                new_field.value[key_2]['value'] = input[key][key_2];

                const single_special = ['study_subject_type']; // remove this and the associated block below with new TSV

                // start by handling simple strings, detect controlledVocab
                if (field_type == "string") {
                    if (typeof field_schema.enum !== "undefined") {
                        new_field.value[key_2].typeClass = "controlledVocabulary";
                    } else {
                        new_field.value[key_2].typeClass = "primitive";
                    }
                } else if (field_type == "integer") {
                    // integers need to be strings
                    new_field.value[key_2].typeClass = "primitive";
                    new_field.value[key_2].multiple = false;
                    new_field.value[key_2]['value'] = input[key][key_2].toString();
                
                // handling more complex objects
                } else if (field_type == "array") {
                    if (field_schema.items.type == "string") {
                        if (single_special.includes(key_2)) { // remove this condition with TSV update
                            new_field.value[key_2].value = input[key][key_2][0];
                        } else {
                            new_field.value[key_2].multiple = true;
                        }

                        // Is there controlled vocabulary?
                        if (typeof field_schema.items.enum !== 'undefined') {
                            new_field.value[key_2].typeClass = "controlledVocabulary";
                        } else {
                            //new_field.value[key_2].multiple = false;
                            new_field.value[key_2].typeClass = "primitive";
                        }

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
            });

            // reset "citation" to "heal_citation" for dataverse compatibility
            if (new_field.typeName == "citation") {
                new_field.typeName = "heal_citation"
            }

            heal.push(new_field);
        }
    });

    // move registrants to the top level, DV compatibility issue
    var registrants = { 
        typeName: "registrants", 
        typeClass: "compound", 
        multiple: true,
        value: new Array
    };

    input.contacts_and_registrants.registrants.forEach(function(entry) {
        Object.keys(entry).forEach(function(value) {
            entry[value] = {
                typeName: value,
                multiple: false,
                typeClass: "primitive",
                value: entry[value]
            }
        });
        registrants.value.push(entry);
    });
    heal.push(registrants);

    // Add the regular dataverse citation fields
    citation.push({ value: input.minimal_info.study_name,
        typeClass: "primitive", multiple: false, typeName: "title" });

    author = { value: new Array, typeClass: "compound", multiple: true, typeName: "author"};
    input.citation.investigators.forEach(function(investigator) {
        let new_investigator = {
            authorName: {
                value: investigator.investigator_last_name.concat(", ", investigator.investigator_first_name),
                typeClass: "primitive", multiple: false, typeName: "authorName"
            }, authorAffiliation: { value: investigator.investigator_affiliation,
                typeClass: "primitive", multiple: false, typeName: "authorAffiliation"
            }, authorIdentifierScheme: { value: investigator.investigator_ID[0].investigator_ID_type,
                typeName: "authorIdentifierScheme", multiple: false, typeClass: "controlledVocabulary"
            }, authorIdentifier: { value: investigator.investigator_ID[0].investigator_ID_value,
                typeName: "authorIdentifier", multiple : false, typeClass: "primitive"
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
                value: contact.contact_last_name.concat(", ", contact.contact_first_name)
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
