'use strict';
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


module.exports = function(models, cb) {
    var routes = require('./routes')({
        models: models
    });

    var app = express();

    var env = process.env.NODE_ENV || 'development';
    if(env === 'development') {
        app.use(errorHandler());
        app.use(morgan('dev'));
    }

    app.use(cors());

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
            validateResponse: true
        }));

console.log('controllers', getControllers(routes));

        app.use(middleware.swaggerRouter({
            controllers: getControllers(routes),
            useStubs: process.env.NODE_ENV === 'development'
        }));

        app.use(middleware.swaggerUi({
            apiDocs: '/v1/schema',
            swaggerUi: '/v1/docs'
        }));

        app.use(function(req, res) {
            res.status(404).json({
                message: 'NOT_FOUND',
                payload: {}
            });
        });

        // important! Do not eliminate `next` as that will disable error handling
        app.use(function(err, req, res, next) {
            // TODO: this should handle cases beyond 403
            res.status(403).json({
                message: err.message,
                payload: err.results
            });
        });

        terminator();

        cb(app);
    });
};

function getControllers(routes) {
    var ret = {};

    fp.each(function(route, v) {
        if(is.object(v)) {
            fp.each(function(k, v) {
                ret[route + '_' + k] = v;
            }, v);
        }
    }, routes);

    return ret;
}
