const healToDataverse = require('./convert/toDataverse.js');

test("generateHEAL", () => {
    const generateHEAL = require('./convert/toHEAL.js')
    const dv = require('./test_data/dv.json');
    const heal = generateHEAL(dv);
    expect(heal).toHaveProperty('citation.heal_funded_status');
    expect(heal).toHaveProperty('citation.investigators[0]');
    expect(heal).toHaveProperty('minimal_info.study_name');
    expect(heal).toHaveProperty('metadata_location.data_repositories');
    expect(heal).toHaveProperty('study_translational_focus');
    expect(heal).toHaveProperty('contacts_and_registrants');
});

test("convertDV", () => {
    const heal = require('./test_data/heal.json');
    const healToDataverse = require('./convert/toDataverse.js');
    const dv = healToDataverse(heal);
    expect(heal).toBeDefined();
});