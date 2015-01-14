'use strict';
var fp = require('annofp');
var str = require('annostring');
var zip = require('annozip');
var camelCase = require('change-case').camelCase;
var axios = require('axios');
var resolveRefs = require('resolve-swagger-refs');


module.exports = function(o) {
    var schema = resolveRefs(o.schema);
    var headers = o.headers || {};
    var basePath = o.url + o.schema.basePath;

    return zip.toObject(zip(schema.paths).map(function(pair) {
        var path = str.ltrim('/', pair[0]);
        var operations = fp.map(function(operation, meta) {
            // TODO: deal with query + params
            var op = function() {
                return axios({
                    method: operation,
                    url: basePath + '/' + path,
                    headers: headers
                });
            };

            op.description = meta.description;
            op.parameters = meta.parameters;
            op.responses = meta.responses;

            return op;
        }, pair[1]);

        return [camelCase(path), operations];
    }));
};
