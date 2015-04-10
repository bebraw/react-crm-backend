'use strict';

var parseEnv = require('parse-env');

var configTemplate = require('./config.template');
var config;

/* eslint-disable no-empty */
try {
    config = require('./config');
}
catch(e) {}

var conf = parseEnv(process.env, configTemplate, config);

conf.port = process.env.OPENSHIFT_NODEJS_PORT || conf.port;
conf.ip = process.env.OPENSHIFT_NODEJS_IP || conf.ip;

module.exports = conf;
