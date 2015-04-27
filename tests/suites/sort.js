'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var getParameters = require('./utils').getParameters;


module.exports = function() {
    it('should be able to perform an ascending sort', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        var firstItem = getParameters(postSchema);
        var secondItem = getParameters(postSchema);

        firstItem.name = 'b';
        secondItem.name = 'a';

        waterfall([
            resource.post.bind(null, firstItem),
            resource.post.bind(null, secondItem),
            resource.get.bind(null, {
                sortBy: 'name'
            })
        ]).then(function(res) {
            var data = res.data;

            assert.equal(data.length, 2, 'Received the right amount of items');
            assert.equal(data[0].name, secondItem.name, 'Received the right first name');
            assert.equal(data[1].name, firstItem.name, 'Received the right second name');

            done();
        }).catch(done);
    });

    it('should be able to perform a descending sort', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        var firstItem = getParameters(postSchema);
        var secondItem = getParameters(postSchema);

        firstItem.name = 'a';
        secondItem.name = 'b';

        waterfall([
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

            done();
        }).catch(done);
    });
};
