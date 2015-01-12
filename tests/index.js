/* global -Promise */
'use strict';
var url = require('url');

var axios = require('axios');
var Promise = require('bluebird');

var config = require('../config');
var models = require('../models')(config.database.test);
var server = require('../server');


tests();

function tests() {
    var port = 1351;
    var root = 'http://localhost:' + port;
    var testcases = [testPostInvoice];

    testcases = testcases.map(function(fn) {
        return Promise.using(models.sequelize.sync({
            force: true
        }), function() {
            return fn(root);
        });
    });

    server(function(app) {
        var s = app.listen(port);

        Promise.all(testcases).catch(function(err) {
            console.error(err);
        }).finally(function() {
            s.close();
        });
    });
}

function testPostInvoice(root) {
    return new Promise(function(resolve, reject) {
        authenticate(root).then(function(res) {
            var u = url.resolve(root, '/v1/invoices');
            var token = res.data && res.data.token;

            // this is missing post data on purpose
            axios.post(u, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(resolve).catch(reject);
        });
    });
}

function authenticate(root) {
    return axios.post(url.resolve(root, 'authenticate'));
}
