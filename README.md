# heal-json

This package converts metadata exported from a project on Dataverse into a HEAL standard metadata JSON file.

As input, `heal-json` expects a dataverse json file exported by the Native API. See: https://guides.dataverse.org/en/latest/api/native-api.html#id46 . The dataset exported needs to be enabled with HEAL metadata block in dataverse.

## Installing

This package can be installed as a node.js command-line application with `npm`:

```
npm i https://github.com/QualitativeDataRepository/heal-json.git
```

## Running

`heal-json` is run as a command-line app with node.js. It takes one argument, an input json file.

If installed globally through `npm`, it can be run as so:

```
heal-json input.json
```

Without any further arguments, the program defaults to standard output. If there are any errors in the metadata that prevent validation, they will be output to the stderr.
