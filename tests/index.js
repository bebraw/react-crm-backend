/* global -Promise */
'use strict';
var assert = require('assert');
var url = require('url');

var concatMap = require('concat-map');
var fp = require('annofp');
var axios = require('axios');
var Promise = require('bluebird');

var config = require('../config');

config.database.test.logging = fp.noop;

var models = require('../models')(config.database.test);
var server = require('../server');
var swaggerClient = require('../lib/swagger2client');

var tests = require('require-dir')();


main();

function main() {
    var port = 1351;
    var root = 'http://localhost:' + port;

    server(models, function(app) {
        var s = app.listen(port);

        Promise.join(
            getData(url.resolve(root, 'v1/schema')),
            getToken(url.resolve(root, 'authenticate')),
        function(schema, token) {
            var client = swaggerClient({
                url: root,
                schema: schema,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            var testcases = getTestcases(tests);

            testcases = testcases.map(function(fn) {
                return Promise.using(models.sequelize.sync({
                    force: true
                }), function() {
                    return fn(assert, client);
                });
            });

            Promise.all(testcases).catch(function(err) {
                console.error(err);
            }).finally(function() {
                s.close();
            });
        }).catch(function(err) {
            console.error(err);

            s.close();
        });
    });
}

function getTestcases(tests) {
    return concatMap(fp.values(tests), fp.values);
}

function getData(url, o) {
    return new Promise(function(resolve, reject) {
        axios.get(url, o).then(function(res) {
            resolve(res.data);
        }).catch(reject);
    });
}

function getToken(url) {
    return new Promise(function(resolve, reject) {
        axios.post(url).then(function(res) {
            resolve(res.data.token);
        }).catch(reject);
    });
}
