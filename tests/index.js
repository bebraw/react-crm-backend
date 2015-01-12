/* global -Promise */
'use strict';
var assert = require('assert');
var url = require('url');

var axios = require('axios');
var Promise = require('bluebird');

var config = require('../config');
var models = require('../models')(config.database.test);
var server = require('../server');
var swaggerClient = require('../lib/swagger2client');


tests();

function tests() {
    var port = 1351;
    var root = 'http://localhost:' + port;
    var testcases = [testPostInvoice];

    server(function(app) {
        var s = app.listen(port);

        Promise.join(
            getSchema(url.resolve(root, 'v1/schema')),
            getToken(url.resolve(root, 'authenticate')),
        function(schema, token) {
            var client = swaggerClient({
                url: root,
                schema: schema,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            testcases = testcases.map(function(fn) {
                return Promise.using(models.sequelize.sync({
                    force: true
                }), function() {
                    return fn(client);
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

function getSchema(url) {
    return new Promise(function(resolve, reject) {
        axios.get(url).then(function(res) {
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

function testPostInvoice(client) {
    return client.invoices.post().then(function() {
        assert(false, 'Posted invoice even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to post invoice as expected');
    });
}

/* TODO:
    GET invoice (all/specific/sortBy/pagination/search)
    POST invoice (ok/fail)
    PUT invoice (allow only for non-accepted)
    DELETE invoice (allow only for non-accepted)

    GET client (all/specific/sortBy/pagination/search)
    POST client (ok/fail)
    PUT client
    DELETE client
*/
