'use strict';
var extend = require('xtend');
var generators = require('annogenerate');
var schema2object = require('schema2object');
var Promise = require('bluebird');


exports.attachData = function(initialData, res) {
    return new Promise(function(resolve) {
        resolve(extend({
            id: res.data.id
        }, initialData));
    });
};

function getParameters(schema) {
    return schema2object.properties2object({
        generators: generators,
        properties: schema2object.getRequiredProperties(schema)
    });
}
exports.getParameters = getParameters;

function generateDependencies(client, schema, resourceSchema) {
    var definitions = schema.definitions;
    var definitionNames = Object.keys(definitions).map(function(name) {
        return {
            name: name,
            lower: name.toLowerCase()
        };
    });
    var resourceProperties = Object.keys(resourceSchema.properties);
    var matches = definitionNames.filter(function(o) {
        return resourceProperties.indexOf(o.lower) >= 0;
    });

    if(matches) {
        return Promise.map(matches, function(match) {
            var definition = definitions[match.name];

            return generateDependencies(client, schema, definition).then(function(data) {
                return client[match.lower + 's'].post(
                    patchParameters(getParameters(definitions[match.name]), data)
                ).then(function(d) {
                    return {
                        field: match.lower,
                        value: d.data.id,
                    };
                });
            });
        });
    }

    return new Promise(function(resolve) {
        resolve();
    });
}
exports.generateDependencies = generateDependencies;

function patchParameters(parameters, fixedValues) {
    fixedValues.forEach(function(o) {
        parameters[o.field] = o.value;
    });

    return parameters;
}
exports.patchParameters = patchParameters;
