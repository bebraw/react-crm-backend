'use strict';
var url = require('url');

var _ = require('lodash');
var axios = require('axios');
require('promise.prototype.finally');

var Promise = require('bluebird');
var swaggerClient = require('swagger2client');

var suites = require('./suites');

var config = require('../config');

config.database.test.logging = noop;

var models = require('../models')(config.database.test);
var createServer = require('../server');


module.exports = function(resourceName) {
    execute(resourceName, _.values(suites));
};

function execute(resourceName, tests) {
    var urlRoot = 'http://localhost';
    var port = 3456;

    describe(resourceName, function() {
        connect(urlRoot, port, resourceName);

        tests.forEach(function(test) {
            test(resourceName);
        });

    });
}
module.exports.execute = execute;

function connect(urlRoot, port, resourceName) {
    var root = urlRoot + ':' + port;
    var server = null;

    beforeEach(function(done) {
        var that = this;

        // set up server
        createServer({
            config: config,
            models: models,
            silent: true,
        }, function(app) {
            server = app.listen(port);

            // construct client
            Promise.join(
                getData(url.resolve(root, 'v1/schema')),
                getToken(url.resolve(root, 'authenticate')),
            function(schema, token) {
                // nuke possible db
                models.sequelize.sync({force: true}).finally(function() {
                    var client = swaggerClient({
                        url: root,
                        schema: schema,
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    });

                    that.client = client;
                    that.schema = schema;
                    that.resource = client[resourceName + 's'];

                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        server.close(done);
    });
}

function getData(u, o) {
    return new Promise(function(resolve, reject) {
        axios.get(u, o).then(function(res) {
            resolve(res.data);
        }).catch(reject);
    });
}

function getToken(u) {
    return new Promise(function(resolve, reject) {
        axios.post(u).then(function(res) {
            resolve(res.data.token);
        }).catch(reject);
    });
}

function noop() {}
