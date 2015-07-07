'use strict';


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            invoicingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }
    );

    return User;
};
