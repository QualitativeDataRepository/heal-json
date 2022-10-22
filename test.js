const healToDataverse = require('./src/convertToDataverse.js');
jest.setTimeout(60 * 1000) // in milliseconds

test("generateHEAL", () => {
    const generateHEAL = require('./src/convertToHEAL.js')
    const dv = require('./test_data/dv.json');
    const heal = generateHEAL(dv);
    expect(heal).toHaveProperty('citation.heal_funded_status');
    expect(heal).toHaveProperty('citation.investigators[0]');
    expect(heal).toHaveProperty('minimal_info.study_name');
    expect(heal).toHaveProperty('metadata_location.data_repositories');
    expect(heal).toHaveProperty('study_translational_focus');
    expect(heal).toHaveProperty('contacts_and_registrants');
});

/*test("randomHEAL", () => {
    const jsf  = require('json-schema-faker');
    const schema = require('./data/heal-schema.json');
    const convertToDataverse = require("./src/convertToDataverse.js")

    jsf.option('fillProperties', false);
    var generated = jsf.generate(schema);
    const dv = healToDataverse(generated);
    expect(dv).toBeDefined();
});*/

test("convertDV", () => {
    const heal = require('./test_data/heal.json');
    const healToDataverse = require('./src/convertToDataverse.js');
    const dv = healToDataverse(heal);
    expect(dv).toHaveProperty("datasetVersion.metadataBlocks.heal");
    expect(dv).toHaveProperty("datasetVersion.metadataBlocks.citation");
    expect(dv.datasetVersion.metadataBlocks.citation.fields).toHaveLength(5);
});

test("download", done => {
    const doi = "doi:10.33564/FK2ORF6KW";
    const dataverseToHEAL = require('./src/downloadFromDataverse.js')
    const callback = function (data) {
        expect(data).toHaveProperty("data_availability.data_collection_start_date");
        done();
    }
    dataverseToHEAL(doi, process.env.DATAVERSE_KEY, callback)
});

test("downloadFail", done => {
    const doi = "doi:10.33564/FK2W0PLDR";
    const dataverseToHEAL = require('./src/downloadFromDataverse.js')
    const callback = function (data) {
        try {
            expect(data).toBeDefined();
            done();
        } catch (error) {
            done(error);
        }
    }
    dataverseToHEAL(doi, undefined, callback)
});

test("output", () => {
    const outputJSON = require('./src/output.js');
    test = { foo: "bar", goo: "nar" }
    expect(outputJSON(test)).toBeUndefined();
});
