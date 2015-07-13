'use strict';
var extend = require('xtend');
var fp = require('annofp');
var is = require('annois');
var express = require('express');
var cors = require('cors');
var helmet = require('helmet');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var swaggerTools = require('swagger-tools');
var terminator = require('t1000');

var config = require('./config');
var jwt = require('./lib/jwt');
var spec = require('./spec');


module.exports = function(o, finalCb) {
    var models = o.models;
    var routes = require('./routes')({
        models: models
    });

    var app = express();

    if(o.logExtra) {
        app.use(errorHandler());
        app.use(morgan('dev'));
    }

    app.use(cors({
        exposedHeaders: ['Total-Count'],
    }));

    app.use(helmet());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(routes.auth());

    // https://github.com/apigee-127/swagger-tools/blob/master/docs/QuickStart.md
    swaggerTools.initializeMiddleware(spec, function(middleware) {
        app.use(middleware.swaggerMetadata());

        app.use(middleware.swaggerSecurity({
            jwt: function(req, authOrSecDef, scopes, cb) {
                jwt(config.jwtSecret, req, cb);
            }
        }));

        app.use(middleware.swaggerValidator({
            validateResponse: false // XXXXX: disabled due to PUT
        }));

        app.use(middleware.swaggerRouter({
            controllers: getControllers(routes),
            useStubs: o.useStubs
        }));

        app.use(middleware.swaggerUi({
            apiDocs: '/v1/schema',
            swaggerUi: '/v1/docs'
        }));

        app.use(function(req, res) {
            res.status(404).json({
                message: 'NOT_FOUND',
                errors: [],
                warnings: []
            });
        });

        // `next` is needed for error handling to work!
        /* eslint-disable no-unused-vars */
        app.use(function(err, req, res, next) {
            if(err.results) {
                return res.status(422).json(extend(err.results, {
                    message: err.message
                }));
            }

            if(o.logExtra) {
                console.trace(err);
            }

            res.status(500).json({});
        });

        if(!o.silent) {
            terminator();
        }

        finalCb(app);
    });
};

function getControllers(routes) {
    var ret = {};

    fp.each(function(route, o) {
        if(is.object(o)) {
            fp.each(function(k, v) {
                ret[route + '_' + k] = v;
            }, o);
        }
    }, routes);

    return ret;
}
