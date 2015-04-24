'use strict';
var extend = require('xtend');
var generators = require('annogenerate');
var schema2object = require('schema2object');


exports.attachData = function(initialData, res) {
    return new Promise(function(resolve) {
        resolve(extend({
            id: res.data.id
        }, initialData));
    });
};

exports.getParameters = function(schema) {
    return schema2object.properties2object({
        generators: generators,
        properties: schema2object.getRequiredProperties(schema)
    });
};
