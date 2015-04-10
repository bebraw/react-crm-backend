'use strict';
var swaggerify = require('swaggerify').routes;


module.exports = function(imports) {
    var ApprovedInvoice = imports.models.ApprovedInvoice;

    return swaggerify('approved_invoice', {
        get: function(req, res) {
            // XXXXXX
            ApprovedInvoice.findAll().then(function(invoices) {
                res.json(invoices);
            });
        },
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
