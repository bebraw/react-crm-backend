'use strict';
var swaggerify = require('swaggerify').routes;


module.exports = function(imports) {
    var Client = imports.models.Client;

    return swaggerify('client', {
        get: function(req, res) {
            var sortBy = req.swagger.params.sortBy.value;

            Client.findAll({
                order: convertToOrder(sortBy)
            }).then(function(clients) {
                res.json(clients);
            });
        },
        post: function(req, res) {
            var body = req.swagger.params.body.value;

            Client.create(body).then(function(client) {
                res.json({
                    id: client.dataValues.id
                });
            });
        },
        put: function(req, res) {
            var body = req.swagger.params.body.value;
            var id = body.id;

            delete body.id;

            Client.update(body, {
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

function convertToOrder(str) {
    if(!str) {
        return;
    }

    if(str.indexOf('-') === 0) {
        return '`' + str.slice(1) + '` DESC';
    }

    return str;
}
