'use strict';

// XXXXX

var restTemplate = require('./rest_template');
var suites = require('./suites');

module.exports = restTemplate.execute('pendinginvoice', [
    suites.get
]);
