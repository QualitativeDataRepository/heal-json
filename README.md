# heal-json
[![codecov](https://codecov.io/github/QualitativeDataRepository/heal-json/branch/main/graph/badge.svg?token=YI9SHR9OYC)](https://codecov.io/github/QualitativeDataRepository/heal-json)

This package converts between Dataverse and HEAL metadata formats. 

- From a dataverse project with the [associated HEAL metadata block](https://github.com/qualitativeDataRepository/heal-metadata) enabled, it produces a HEAL-compliant JSON file.
- From a HEAL json file, it converts the metadata into a Dataverse metadata file and uploads it to a Dataverse instance.

As input, `heal-json` either a persistent ID (to convert from dataverse to HEAL), or a HEAL json file (to convert and upload to dataverse).

## Installing

This package can be installed as a node.js command-line application with `npm`:

```
npm i https://github.com/QualitativeDataRepository/heal-json.git
```

## Running

`heal-json` is run as a command-line app with node.js. It has two functions: converting from a dataverse metadata file to a HEAL metadata file, and vice versa.

If installed globally through `npm`, HEAL metadata can be generated from a dataverse project as so:

```
heal-json 'doi:XXXX/XXXX.YYYY' <api key> > heal.json
```

and HEAL data can be uploaded to dataverse like so:

```
heal-json heal.json <api key>
```
