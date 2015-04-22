/*jshint node:true*/
'use strict';
var templates = require('../templates');

var name = 'client'; // eslint-disable-line no-undef

module.exports = {
    get: templates.get(name),
    post: templates.post(name),
    put: templates.put(name),
};
