'use strict';
var swaggerify = require('swaggerify').routes;

var templates = require('./templates');


module.exports = function(imports) {
    var model = imports.models.User;

    return swaggerify('user', {
        get: templates.get(model),
        post: templates.post(model),
        put: templates.put(model),
    });
};
