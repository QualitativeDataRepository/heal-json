# heal-json
[![codecov](https://codecov.io/github/QualitativeDataRepository/heal-json/branch/main/graph/badge.svg?token=YI9SHR9OYC)](https://codecov.io/github/QualitativeDataRepository/heal-json)

This package converts between Dataverse and HEAL metadata formats. 

- From a dataverse project with the [associated HEAL metadata block](https://github.com/qualitativeDataRepository/heal-metadata) enabled, it produces a HEAL-compliant JSON file.
- From a local HEAL json file, it converts the metadata into a Dataverse metadata file and uploads it to a Dataverse instance.

As input, `heal-json` either a persistent ID (to convert from dataverse to HEAL), or a HEAL json file (to convert and upload to dataverse).

## Installing

This package can be installed as a node.js command-line application with `npm`:

```
npm i https://github.com/QualitativeDataRepository/heal-json.git
```

This will install the package along with all the required prerequisites.

## Running heal-json script

`heal-json` is run as a command-line app with node.js. It has two functions: converting from a dataverse metadata file to a HEAL metadata file, and vice versa.

If installed globally through `npm`, HEAL metadata can be generated from a dataverse project as so:

```
heal-json 'doi:XXXX/XXXX.YYYY' [api key] > heal.json
```

This exports the metadata from the project at doi:XXXX/XXXX.YYYY (replace with the persistent ID of the prject on the dataverse instance)

HEAL data stored locally as JSON can be uploaded to dataverse like so:

```
heal-json heal.json [api key]
```

in this case, replace heal.json with your JSON file. It should adhere to the schema at: https://github.com/QualitativeDataRepository/heal-json/blob/main/data/heal-schema.json

(Note: this file is a slightly edited version of the schema developed at:
https://github.com/HEAL/heal-metadata-schemas/blob/fb001d4ec06d42dc37fd23aa8fe674b1c2307ad8/study-level-metadata-schema/schema-clean/json/study-metadata-schema.json)

## Dataverse API key

Users will need to supply an API key in two sitations:

- Downloading an *unpublished* dataset on a Dataverse instance (that your user account has access to online)
- Uploading a dataset to a Dataverse instance

You can generate an API key at: https://data.qdr.syr.edu/dataverseuser.xhtmlselectTab=apiTokenTab (substitute the domain for stage server, currently the only one with HEAL enabled)
