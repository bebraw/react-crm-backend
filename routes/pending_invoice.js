'use strict';
var swaggerify = require('swaggerify').routes;


module.exports = function(imports) {
    var PendingInvoice = imports.models.PendingInvoice;

    return swaggerify('pending_invoice', {
        get: function(req, res) {
            PendingInvoice.findAll().then(function(invoices) {
                res.json(invoices);
            });
        },
        post: function(req, res) {
            var body = req.swagger.params.body.value;

            PendingInvoice.create(body).then(function(invoice) {
                res.json({
                    id: invoice.dataValues.id
                });
            });
        },
        put: function(req, res) {
            var body = req.swagger.params.body.value;
            var id = body.id;

            delete body.id;

            PendingInvoice.update(body, {
                where: {
                    id: id
                }
            }).then(function(ids) {
                var id = ids[0];

                if(id) {
                    res.json({id: id});
                }
                else {
                    // TODO: specify this case better
                    res.status(403).json({
                        message: 'NOT_FOUND'
                    });
                }
            });
        }
    });
};
