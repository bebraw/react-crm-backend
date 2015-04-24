'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var getParameters = require('./utils').getParameters;


module.exports = function() {
    it('should be able to paginate', function(done) {
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
                page: 0,
                perPage: 1
            })
        ]).then(function(res) {
            var data = res.data;

            assert.equal(data.length, 1, 'Received the right amount of items');
            assert.equal(data[0].name, firstItem.name, 'Received the right first name');
        }).catch(function() {
            assert(false, 'Didn\'t get paginated items');
        }).finally(done);
    });
};
