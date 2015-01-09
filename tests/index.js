'use strict';
var url = require('url');

var axios = require('axios');


tests();

function tests() {
    var root = 'http://localhost:3000';

    authenticate(root).then(testPostInvoice.bind(null, root), function(err) {
        console.error('failed to authenticate', err);
    });
}

function authenticate(root) {
    return axios.post(url.resolve(root, 'authenticate'));
}

function testPostInvoice(root, res) {
    var u = url.resolve(root, '/v1/invoices');
    var token = res.data && res.data.token;

    // this is missing post data on purpose
    axios.post(u, {}, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(function(res) {
        console.log('ok', res);
    }, function(err) {
        console.error(err);
    });
}
