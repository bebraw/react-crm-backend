'use strict';
var swaggerify = require('swaggerify').routes;
var languages = require('../spec/constants/languages');


module.exports = function() {
    return swaggerify('language', {
        get: function(req, res) {
            res.json(languages);
        }
    });
};
