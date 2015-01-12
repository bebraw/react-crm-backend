'use strict';
var swaggerify = require('swaggerify').routes;


module.exports = function(imports) {
    var SentInvoice = imports.models.SentInvoice;

    return swaggerify('sent_invoice', {
        get: function(req, res) {
            // XXXXXX
            SentInvoice.findAll().then(function(invoices) {
                res.json(invoices);
            });
        },
        post: function(req, res) {
            var body = req.swagger.params.body.value;

            // XXXXXX
            SentInvoice.create(body).then(function(invoice) {
                res.json({
                    id: invoice.dataValues.id
                });
            });
        }
    });
};
