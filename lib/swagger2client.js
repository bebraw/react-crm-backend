'use strict';
var querystring = require('querystring');

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
            var op = function(data) {
                var o = {
                    method: operation,
                    url: basePath + '/' + path,
                    headers: headers
                };

                if(data) {
                    if(operation === 'get') {
                        o.url += '?' + querystring.stringify(data);
                    }
                    else {
                        o.data = data;
                    }
                }

                return axios(o);
            };

            op.description = meta.description;
            op.parameters = meta.parameters;
            op.responses = meta.responses;

            return op;
        }, pair[1]);

        return [camelCase(path), operations];
    }));
};
