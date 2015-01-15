'use strict';
var Promise = require('bluebird');
var schema2object = require('schema2object');
var waterfall = require('promise-waterfall');
var extend = require('xtend');
var fp = require('annofp');


module.exports = function(assert, client) {
    var resource = client.clients;
    var postSchema = resource.post.parameters[0].schema;

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
            }).catch(function(res) {
                var data = res.data;

                assert(true, 'Failed to post client as expected');

                assert.equal(res.status, 422);
                assert(data.message, 'Error message exists');
                assert(data.errors, 'Errors exist');
                assert(data.warnings, 'Warnings exist');
            });
        },
        postValid: function() {
            return resource.post(getParameters(postSchema)).then(function() {
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
            var putParameters = getParameters(postSchema);

            return waterfall([
                resource.post.bind(null, getParameters(postSchema)),
                attachData.bind(null, putParameters),
                resource.put.bind(null),
                resource.get.bind(null)
            ]).then(function(res) {
                var item = res.data[0];

                fp.each(function(k, v) {
                    assert.equal(v, item[k], k + ' fields are equal');
                }, putParameters);

                assert(true, 'Updated client as expected');
            }).catch(function() {
                assert(false, 'Didn\'t update client even though should have');
            });
        },
        ascendingSort: function() {
            var firstItem = getParameters(postSchema);
            var secondItem = getParameters(postSchema);

            firstItem.name = 'a';
            secondItem.name = 'b';

            return waterfall([
                resource.post.bind(null, firstItem),
                resource.post.bind(null, secondItem),
                resource.get.bind(null, {
                    sortBy: 'name'
                })
            ]).then(function(res) {
                var data = res.data;

                assert.equal(data.length, 2, 'Received the right amount of items');
                assert.equal(data[0].name, firstItem.name, 'Received the right first name');
                assert.equal(data[1].name, secondItem.name, 'Received the right second name');
            }).catch(function() {
                assert(false, 'Didn\'t get ascending sort');
            });
        },
        descendingSort: function() {
            var firstItem = getParameters(postSchema);
            var secondItem = getParameters(postSchema);

            firstItem.name = 'a';
            secondItem.name = 'b';

            return waterfall([
                resource.post.bind(null, firstItem),
                resource.post.bind(null, secondItem),
                resource.get.bind(null, {
                    sortBy: '-name'
                })
            ]).then(function(res) {
                var data = res.data;

                assert.equal(data.length, 2, 'Received the right amount of items');
                assert.equal(data[0].name, secondItem.name, 'Received the right first name');
                assert.equal(data[1].name, firstItem.name, 'Received the right second name');
            }).catch(function() {
                assert(false, 'Didn\'t get descending sort');
            });
        },
        pagination: function() {
            var firstItem = getParameters(postSchema);
            var secondItem = getParameters(postSchema);

            // TODO: assert
        },
        // TODO: sort + paginate
        search: function() {
            // 1. generate items to sort by some feature
            var firstItem = getParameters(postSchema);
            var secondItem = getParameters(postSchema);

            // TODO: assert that the correct item was found
        }
        // TODO: sort + search
        // TODO: sort + paginate
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
