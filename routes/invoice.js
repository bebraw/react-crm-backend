'use strict';
var swaggerify = require('swaggerify').routes;

var templates = require('./templates');


module.exports = function(imports) {
    var model = imports.models.Invoice;

    return swaggerify('invoice', {
        get: templates.get(model),
        post: templates.post(model),
        put: templates.put(model),
    });
};
