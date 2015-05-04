'use strict';
var assert = require('assert');

var getParameters = require('./utils').getParameters;


module.exports = function(resourceName) {
    it('should deal with invalid POST', function(done) {
        this.resource.post().then(function() {
            assert(false, 'Posted ' + resourceName + ' even though shouldn\'t');
        }).catch(function(res) {
            var data = res.data;

            assert(true, 'Failed to post ' + resourceName + ' as expected');

            assert.equal(res.status, 422);
            assert(data.message, 'Error message exists');
            assert(data.errors, 'Errors exist');
            assert(data.warnings, 'Warnings exist');
        }).finally(done);
    });

    it('should be able to POST', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;

        resource.post(getParameters(postSchema)).then(function() {
            assert(true, 'Posted ' + resourceName + ' as expected');

            done();
        }).catch(done);
    });
};
