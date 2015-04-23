'use strict';


exports.convertToOrder = function(str) {
    if(!str) {
        return '';
    }

    if(str.indexOf('-') === 0) {
        return '`' + str.slice(1) + '` DESC';
    }

    return str;
};

exports.convertToObjects = function(results) {
    return results.map(function(result) {
        return result.dataValues;
    });
};
