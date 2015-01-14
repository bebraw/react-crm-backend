'use strict';
var Promise = require('bluebird');
var schema2object = require('schema2object');
var waterfall = require('promise-waterfall');
var extend = require('xtend');


/* TODO:
    GET client (sortBy/pagination/search)
*/

module.exports = function(assert, client) {
    var resource = client.clients;

    return {
        get: function() {
            return resource.get().then(function(res) {
                assert(res.data.length === 0, 'Failed to get clients as expected');
            }).catch(function() {
                assert(true, 'Failed to get clients as expected');
            });
        },
        postInvalid: function() {
            return resource.post().then(function() {
                assert(false, 'Posted client even though shouldn\'t');
            }).catch(function() {
                assert(true, 'Failed to post client as expected');
            });
        },
        postValid: function() {
            var schema = resource.post.parameters[0].schema;

            return resource.post(getParameters(schema)).then(function(d) {
                assert(true, 'Posted client as expected');
            }).catch(function(err) {
                assert(false, 'Failed to post client', err);
            });
        },
        put: function() {
            return resource.put().then(function() {
                assert(false, 'Updated client even though shouldn\'t');
            }).catch(function() {
                assert(true, 'Failed to update client as expected');
            });
        },
        postAndPut: function() {
            var schema = resource.post.parameters[0].schema;
            var putParameters = getParameters(schema);

            return waterfall([
                resource.post.bind(null, getParameters(schema)),
                attachData.bind(null, putParameters),
                resource.put.bind(null),
                resource.get.bind(null)
            ]).then(function() {
                assert(true, 'Updated client as expected');
            }).catch(function() {
                assert(false, 'Didn\'t update client even though should have');
            });
        }
    };
};

function attachData(initialData, res) {
    return new Promise(function(resolve) {
        resolve(extend({
            id: res.data.id
        }, initialData));
    });
}

function getParameters(schema) {
    var properties = schema2object.getRequiredProperties(schema);

    return schema2object.properties2object(properties);
}
