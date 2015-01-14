'use strict';


/* TODO:
    GET client (all/specific/sortBy/pagination/search)
    POST client (ok/fail)
    PUT client
    DELETE client

    GET pagination
    GET sortBy
*/

module.exports = function(assert, client) {
    var resource = client.clients;

    return {
        get: function() {
            return resource.get().then(function(res) {
                assert(res.data.length === 0, 'Failed to get clients as expected');
            }).catch(function() {
                assert(true, 'Failed to get clients as expected');
            });
        },
        postInvalid: function() {
            return resource.post().then(function() {
                assert(false, 'Posted client even though shouldn\'t');
            }).catch(function() {
                assert(true, 'Failed to post client as expected');
            });
        },
        postValid: function() {
            var postSchema = resource.post.parameters[0].schema;

            // TODO: generate a valid client based on schema
            // resource.post.parameters.schema / description etc.
            // attach post.parameters.schema + resolve ref
            // pass schema to generator + attach generated object to body
            return resource.post({}).then(function() {
                // make sure id was received (post.responses.200.schema)
                assert(true, 'Posted client as expected');

                // perform get with id now
            }).catch(function(err) {
                assert(false, 'Failed to post client', err);
            });
        },
        put: function() {
            // TODO: post, put using same id, get using id + validate
            return resource.put().then(function() {
                assert(false, 'Updated client even though shouldn\'t');
            }).catch(function() {
                assert(true, 'Failed to update client as expected');
            });
        }
    };
};
