'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var getParameters = require('./utils').getParameters;


module.exports = function() {
    it('should be able to return a count in header', function(done) {
        this.resource.get().then(function(res) {
            assert.equal(res.headers['total-count'], 0, 'Received the right count');
        }).catch(function() {
            assert(false, 'Didn\'t get count');
        }).finally(done);
    });

    it('should be able to count multiple', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;

        waterfall([
            resource.post.bind(null, getParameters(postSchema)),
            resource.post.bind(null, getParameters(postSchema)),
            resource.get.bind(null)
        ]).then(function(res) {
            assert.equal(res.headers['total-count'], 2, 'Received the right count');

            done();
        }).catch(done);
    });
};
