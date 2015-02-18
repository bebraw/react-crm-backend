'use strict';


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
            name: DataTypes.STRING,
            invoicingId: DataTypes.INTEGER,
        }
    );

    return User;
};
