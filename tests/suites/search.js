'use strict';
var assert = require('assert');

var waterfall = require('promise-waterfall');

var utils = require('./utils');
var getParameters = utils.getParameters;
var patchParameters = utils.patchParameters;
var generateDependencies = utils.generateDependencies;


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

        generateDependencies(this.client, this.schema, postSchema).then(function(d) {
            waterfall([
                resource.post.bind(null, patchParameters(localData[0], d)),
                resource.post.bind(null, patchParameters(localData[1], d)),
                resource.post.bind(null, patchParameters(localData[2], d)),
                resource.get.bind(null, {q: fixedValue})
            ]).then(function(res) {
                assert.equal(
                    contain(localData, firstString, fixedValue),
                    res.data.length
                );

                done();
            }).catch(done);

        });
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

        generateDependencies(this.client, this.schema, postSchema).then(function(d) {
            waterfall([
                resource.post.bind(null, patchParameters(localData[0], d)),
                resource.post.bind(null, patchParameters(localData[1], d)),
                resource.post.bind(null, patchParameters(localData[2], d)),
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
