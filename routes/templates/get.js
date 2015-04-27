'use strict';
var utils = require('./utils');

var convertToOrder = utils.convertToOrder;
var convertToObjects = utils.convertToObjects;


module.exports = function(model) {
    return function(req, res) {
        var params = req.swagger.params;

        if(params.q.value) {
            search(model, params, res);
        }
        else {
            find(model, params, res);
        }
    };
};

function search(model, params, res) {
    var field = params.field.value || 'all';
    var q = params.q.value;

    // rest
    var sortBy = params.sortBy.value;
    var perPage = params.perPage.value;
    var page = params.page.value;

    var whereClause = {};

    if(field === 'all') {
        var attributes = Object.keys(model.attributes);

        whereClause = constructAllQuery(attributes, q);
    }
    else {
        whereClause[field] = {
            $like: '%' + q + '%',
        };
    }

    findAndCount(model, params, res, {
        order: convertToOrder(sortBy),
        limit: perPage,
        offset: page * perPage,
        where: whereClause,
    });
}

function constructAllQuery(attributes, q) {
    var or = [];

    attributes.forEach(function(name) {
        var o = {};

        o[name] = {
            $like: '%' + q + '%',
        };

        or.push(o);
    });

    return {
        $or: or
    };
}

function find(model, params, res) {
    var sortBy = params.sortBy.value;
    var perPage = params.perPage.value;
    var page = params.page.value;

    findAndCount(model, params, res, {
        order: convertToOrder(sortBy),
        limit: perPage,
        offset: page * perPage,
    });
}

function findAndCount(model, params, res, query) {
    model.findAndCount(query).then(function(result) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Total-Count', result.count);
        res.end(JSON.stringify(convertToObjects(result.rows)));

        // XXX: figure out why this doesn't set Content-Type right always
        // that causes swagger validation to fail!
        //res.header('Total-Count', result.count).json(convertToObjects(result.rows));
    });
}
