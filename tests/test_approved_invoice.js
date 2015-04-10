'use strict';


/* TODO:
    GET invoice (all/specific/sortBy/pagination/search)
    POST invoice (ok/fail)
*/

module.exports = function(assert, client) {
    var resource = client.approvedInvoices;

    return {
        get: function() {
            return resource.get().then(function(res) {
                assert(res.data.length === 0, 'Failed to get invoices as expected');
            }).catch(function() {
                assert(true, 'Failed to get invoices as expected');
            });
        },
        post: function() {
            return resource.post().then(function() {
                assert(false, 'Posted invoice even though shouldn\'t');
            }).catch(function() {
                assert(true, 'Failed to post invoice as expected');
            });
        }
    };
};
