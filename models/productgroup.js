'use strict';

module.exports = function(sequelize, DataTypes) {
    var ProductGroup = sequelize.define('ProductGroup', {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }
    );

    return ProductGroup;
};
