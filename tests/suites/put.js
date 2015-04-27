'use strict';
var assert = require('assert');

var fp = require('annofp');
var waterfall = require('promise-waterfall');

var utils = require('./utils');
var attachData = utils.attachData;
var getParameters = utils.getParameters;


module.exports = function(resourceName) {
    it('should be able to PUT', function(done) {
        this.resource.put().then(function() {
            assert(false, 'Updated ' + resourceName + ' even though shouldn\'t');
        }).catch(function() {
            assert(true, 'Failed to update ' + resourceName + ' as expected');
        }).finally(done);
    });

    it('should be able to POST and PUT', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        var putParameters = getParameters(postSchema);

        waterfall([
            resource.post.bind(null, getParameters(postSchema)),
            attachData.bind(null, putParameters),
            resource.put.bind(null),
            resource.get.bind(null)
        ]).then(function(res) {
            var item = res.data[0];

            fp.each(function(k, v) {
                assert.equal(v, item[k], k + ' fields are equal');
            }, putParameters);

            assert(true, 'Updated ' + resourceName + ' as expected');

            done();
        }).catch(done);
    });
};
