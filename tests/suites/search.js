'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var utils = require('./utils');
var getParameters = utils.getParameters;


module.exports = function() {
    it('should be able to search all by default', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        // XXX: if schema doesn't have strings, this will fail
        var firstString = findFirst(postSchema.properties, 'string');
        var fixedValue = 'foobar';
        var firstParameters = getParameters(postSchema);

        firstParameters[firstString] = fixedValue;

        // TODO: it would be a good idea to set another field of another record here
        // to test this properly
        var localData = [
            firstParameters,
            getParameters(postSchema),
            getParameters(postSchema),
        ];

        waterfall([
            resource.post.bind(null, localData[0]),
            resource.post.bind(null, localData[1]),
            resource.post.bind(null, localData[2]),
            resource.get.bind(null, {q: fixedValue})
        ]).then(function(res) {
            assert.equal(
                contain(localData, firstString, fixedValue),
                res.data.length
            );

            done();
        }).catch(done);
    });

    it('should be able to search by field', function(done) {
        var resource = this.resource;
        var postSchema = resource.post.parameters[0].schema;
        // XXX: if schema doesn't have strings, this will fail
        var firstString = findFirst(postSchema.properties, 'string');
        var fixedValue = 'foobar';
        var firstParameters = getParameters(postSchema);

        firstParameters[firstString] = fixedValue;

        var localData = [
            firstParameters,
            getParameters(postSchema),
            getParameters(postSchema),
        ];

        waterfall([
            resource.post.bind(null, localData[0]),
            resource.post.bind(null, localData[1]),
            resource.post.bind(null, localData[2]),
            resource.get.bind(null, {
                field: firstString,
                q: fixedValue
            })
        ]).then(function(res) {
            assert.equal(
                contain(localData, firstString, fixedValue),
                res.data.length
            );

            done();
        }).catch(done);
    });
};

function findFirst(orig, type) {
    var keys = Object.keys(orig);
    var i, k, o, len;

    for(i = 0, len = keys.length; i < len; i++) {
        k = keys[i];
        o = orig[k];

        if(o.type === type) {
            return k;
        }
    }
}

function contain(arr, k, v) {
    return arr.filter(function(o) {
        return o[k] === v;
    }).length;
}
