'use strict';
var fp = require('annofp');
var extend = require('xtend');


module.exports = function(schema) {
    var definitions = schema.definitions;
    var paths = schema.paths;

    if(!definitions) {
        return console.trace('missing definitions to resolve');
    }

    var ret = fp.deepcopy(schema);

    ret.definitions = resolveDefinitionRefs(definitions);
    ret.paths = resolvePathRefs(definitions, paths);

    return ret;
};

function resolveDefinitionRefs(definitions) {
    return fp.map(function(name, definition) {
        if(!definition.properties) {
            return definition;
        }

        definition.properties = fp.map(function(name, field) {
            var def;

            def = resolveRef(definitions, field);

            if(def) {
                return extend(def, field);
            }

            def = resolveArrayRef(definitions, field);

            if(def) {
                field.items = def;
            }

            return field;
        }, definition.properties);

        return definition;
    }, definitions);
}

function resolvePathRefs(definitions, paths) {
    return fp.map(function(name, path) {
        return fp.map(function(operation, meta) {
            meta.parameters = resolveParameterRefs(definitions, meta.parameters);
            meta.responses = resolveResponseRefs(definitions, meta.responses);

            return meta;
        }, path);
    }, paths);
}

function resolveParameterRefs(definitions, parameters) {
    if(!parameters) {
        return;
    }

    return fp.map(function(meta) {
        var def;

        def = resolveRef(definitions, meta.schema);

        if(def) {
            meta.schema = def;
        }
        else {
            // map through parameters
            meta.schema = fp.map(function(name, item) {
                var def = resolveArrayRef(definitions, item);

                if(def) {
                    item.items = def;
                }

                return item;
            }, meta.schema);
        }

        return meta;
    }, parameters);
}

function resolveResponseRefs(definitions, responses) {
    return fp.map(function(code, meta) {
        var def;

        def = resolveRef(definitions, meta.schema);

        if(def) {
            meta.schema = def;
        }

        def = resolveArrayRef(definitions, meta.schema);

        if(def) {
            meta.schema.items = def;
        }

        return meta;
    }, responses);
}

function resolveRef(definitions, field) {
    var ref = field.$ref;

    return definitions[getRefName(ref)];
}

function resolveArrayRef(definitions, field) {
    var ref = field.items && field.items.$ref;

    return definitions[getRefName(ref)];
}

function getRefName(ref) {
    if(ref) {
        return ref.split('/').slice(-1)[0];
    }
}
