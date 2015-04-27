'use strict';
var assert = require('assert');


module.exports = function(resourceName) {
    it('should GET', function(done) {
        this.resource.get().then(function(res) {
            assert(res.data.length === 0, 'Failed to get ' + resourceName + 's as expected');

            done();
        }).catch(done);
    });
};
