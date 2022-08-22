#!/usr/bin/env node

require('./dv_to_heal.js')

const  path = require('path');
const args = process.argv.slice(2);
let absolute_arg = path.resolve(args[0]);
const input_json = require(absolute_arg);

const output = dataverseToHEAL(input_json);
const pretty_print = JSON.stringify(output, null, 4);
console.output(pretty_print);
