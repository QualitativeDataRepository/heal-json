# heal-json

This package converts metadata exported from a project on Dataverse into a HEAL standard metadata JSON file.

As input, `heal-json` expects a dataverse json file exported by the Native API. See: https://guides.dataverse.org/en/latest/api/native-api.html#id46 . The dataset exported needs to be enabled with HEAL metadata block in dataverse.

## Installing

This package can be installed as a node.js command-line application with `npm`:

```
npm i https://github.com/QualitativeDataRepository/heal-json.git
```

## Running

`heal-json` is run as a command-line app with node.js. It has two functions: converting from a dataverse metadata file to a HEAL metadata file, and vice versa.

If installed globally through `npm`, HEAL metadata can be generated from a dataverse project as so:

```
heal-json 'doi:XXXX/XXXX.YYYY' > heal.json
```

and HEAL data can be uploaded to dataverse like so:

```
heal-json heal.json <api key>
```