'use strict';


/* TODO:
    GET invoice (all/specific/sortBy/pagination/search)
    POST invoice (ok/fail)
*/

exports.get = function(assert, client) {
    return client.sentInvoices.get().then(function(res) {
        assert(res.data.length === 0, 'Failed to get invoices as expected');
    }).catch(function() {
        assert(true, 'Failed to get invoices as expected');
    });
};

exports.post = function(assert, client) {
    return client.sentInvoices.post().then(function() {
        assert(false, 'Posted invoice even though shouldn\'t');
    }).catch(function() {
        assert(true, 'Failed to post invoice as expected');
    });
};
