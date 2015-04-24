'use strict';
var utils = require('./utils');

var convertToOrder = utils.convertToOrder;
var convertToObjects = utils.convertToObjects;


module.exports = function(model) {
    return function(req, res) {
        var params = req.swagger.params;
        var sortBy = params.sortBy.value;
        var perPage = params.perPage.value;
        var page = params.page.value;

        // q, field (all or specific)
        // -> {where: title: { like: '%awe%' }} for specific
        // all???

        // where: Sequelize.or({field: '%awe%'}, ...)

        model.findAndCount({
            order: convertToOrder(sortBy),
            limit: perPage,
            offset: page * perPage
        }).then(function(result) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Total-Count', result.count);
            res.end(JSON.stringify(convertToObjects(result.rows)));

            // XXX: figure out why this doesn't set Content-Type right always
            // that causes swagger validation to fail!
            //res.header('Total-Count', result.count).json(convertToObjects(result.rows));
        });
    };
};
