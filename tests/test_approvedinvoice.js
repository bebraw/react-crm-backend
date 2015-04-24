'use strict';

// XXXXX

/* TODO:
    GET invoice (all/specific/sortBy/pagination/search)
    POST invoice (ok/fail)
*/

var restTemplate = require('./rest_template');

module.exports = restTemplate.execute('approvedinvoice', [
    restTemplate.getTests
]);

// the problem is that the other tests rely either or PUT/POST. these will be
// implemented differently in this case due to transition logic
