#!/usr/bin/env node

// Upgrade for JSON.stringify, updated to allow arrays
(function(){
    // Convert array to object
    var convArrToObj = function(array){
        var thisEleObj = new Object();
        if(typeof array == "object"){
            for(var i in array){
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        }else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function(input){
        if(oldJSONStringify(input) == '[]')
            return oldJSONStringify(convArrToObj(input));
        else
            return oldJSONStringify(input);
    };
})();

const  path = require('path');
const args = process.argv.slice(2);
let absolute_arg = path.resolve(args[0]);
//console.log("args: ", args);

//const schema = require('./data/heal-schema.json');

//const input = require(absolute_arg)
//const input = require("../test/output.json")


var output = new Object;
output.metadataBlocks = new Object;
output.metadataBlocks.citation = { fields: new Array };
output.metadataBlocks.heal = { fields: new Array };

var citation = output.metadataBlocks.citation.fields;
heal = output.metadataBlocks.heal.fields;

Object.keys(input).forEach(function(key) {
    heal[key] = {
        typeName: key,
        typeClass: "compound",
        multiple: false,
        value: new Array
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



