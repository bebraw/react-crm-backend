'use strict';
var swaggerify = require('./swaggerify');
var languages = require('../spec/constants/languages');


module.exports = swaggerify('language', {
    get: function(req, res) {
        res.json(languages);
    }
});

