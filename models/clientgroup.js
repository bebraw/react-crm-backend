'use strict';

module.exports = function(sequelize, DataTypes) {
    var ClientGroup = sequelize.define('ClientGroup', {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        }
    );

    return ClientGroup;
};
