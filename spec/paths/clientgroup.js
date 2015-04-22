'use strict';
var templates = require('../templates');

var name = 'clientgroup'; // eslint-disable-line no-undef

module.exports = {
    get: templates.get(name),
    post: templates.post(name),
    put: templates.put(name),
};
