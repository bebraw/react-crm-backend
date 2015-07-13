'use strict';
var assert = require('assert');

var fp = require('annofp');
var waterfall = require('promise-waterfall');

var utils = require('./utils');
var attachData = utils.attachData;
var getParameters = utils.getParameters;
var patchParameters = utils.patchParameters;
var generateDependencies = utils.generateDependencies;


module.exports = function(resourceName) {
    it('should be able to PUT', function(done) {
        var status;
        this.resource.put().then(function(d) {
            status = d.status;
        }).catch(function(d) {
            status = d.status;
        }).finally(function() {
          done(status !== 200 ? null : new Error('Invalid status'));
        });
    });

    it('should be able to POST and PUT', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        var putParameters = getParameters(postSchema);

        generateDependencies(this.client, this.schema, postSchema).then(function(d) {
            waterfall([
                resource.post.bind(null, patchParameters(getParameters(postSchema), d)),
                attachData.bind(null, patchParameters(putParameters, d)),
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
    });
};
