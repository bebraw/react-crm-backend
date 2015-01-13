'use strict';


/* TODO:
    GET client (all/specific/sortBy/pagination/search)
    POST client (ok/fail)
    PUT client
    DELETE client
*/

exports.get = function(assert, client) {
    return client.clients.get().then(function(res) {
        assert(res.data.length === 0, 'Failed to get clients as expected');
    }).catch(function() {
        assert(true, 'Failed to get clients as expected');
    });
};

exports.post = function(assert, client) {
    return client.clients.post().then(function() {
        assert(false, 'Posted client even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to post client as expected');
    });
};

exports.put = function(assert, client) {
    return client.clients.put().then(function() {
        assert(false, 'Updated client even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to update client as expected');
    });
};
