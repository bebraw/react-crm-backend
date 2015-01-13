'use strict';


/* TODO:
    GET invoice (all/specific/sortBy/pagination/search)
    POST invoice (ok/fail)
    PUT invoice (allow only for non-accepted)
    DELETE invoice (allow only for non-accepted)
*/

exports.get = function(assert, client) {
    return client.pendingInvoices.get().then(function(res) {
        assert(res.data.length === 0, 'Failed to get invoices as expected');
    }).catch(function() {
        assert(true, 'Failed to get invoices as expected');
    });
};

exports.post = function(assert, client) {
    return client.pendingInvoices.post().then(function() {
        assert(false, 'Posted invoice even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to post invoice as expected');
    });
};

exports.put = function(assert, client) {
    return client.pendingInvoices.put().then(function() {
        assert(false, 'Updated invoice even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to update invoice as expected');
    });
};

/*
not in schema yet
exports.delete = function(assert, client) {
    return client.invoices.delete();
};*/
