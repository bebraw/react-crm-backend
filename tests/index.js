'use strict';
var url = require('url');

var axios = require('axios');

var apikey = require('../config/').apikey;


tests();

function tests() {
    var root = 'http://localhost:3000';

    testPostInvoice(root);
}

function testPostInvoice(root) {
    // this is missing post data on purpose
    axios.post(url.resolve(root, '/v1/invoices'), {}, {
        headers: {
            'x-auth-token': apikey
        }
    }).then(function(res) {
        console.log('ok', res);
    }, function(err) {
        console.error(err);
    });
}
