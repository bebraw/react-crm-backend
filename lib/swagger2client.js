'use strict';
var fp = require('annofp');
var str = require('annostring');
var zip = require('annozip');
var axios = require('axios');


module.exports = function(o) {
    var schema = o.schema;
    var headers = o.headers || {};
    var basePath = o.url + o.schema.basePath;

    return zip.toObject(zip(schema.paths).map(function(pair) {
        var path = str.ltrim('/', pair[0]);
        var operations = fp.map(function(operation, v) {
            console.log('url', basePath, basePath + '/' + path);

            // TODO: deal with query + params
            return function() {
                return axios({
                    method: operation,
                    url: basePath + '/' + path,
                    headers: headers
                });
            };
        }, pair[1]);

        return [path, operations];
    }));
};
