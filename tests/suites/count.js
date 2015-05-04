'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var utils = require('./utils');
var getParameters = utils.getParameters;
var patchParameters = utils.patchParameters;
var generateDependencies = utils.generateDependencies;


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

        generateDependencies(this.client, this.schema, postSchema).then(function(d) {
            waterfall([
                resource.post.bind(null, patchParameters(getParameters(postSchema), d)),
                resource.post.bind(null, patchParameters(getParameters(postSchema), d)),
                resource.get.bind(null)
            ]).then(function(res) {
                assert.equal(res.headers['total-count'], 2, 'Received the right count');

                done();
            }).catch(done);
        });
    });
};
