'use strict';
var swaggerify = require('swaggerify').routes;

var templates = require('./templates');


module.exports = function(imports) {
    var ApprovedInvoice = imports.models.ApprovedInvoice;

    return swaggerify('approvedinvoice', {
        get: templates.get(ApprovedInvoice),
        post: function(req, res) {
            var body = req.swagger.params.body.value;

            // XXXXXX
            ApprovedInvoice.create(body).then(function(invoice) {
                res.json({
                    id: invoice.dataValues.id
                });
            });
        }
    });
};
