'use strict';

module.exports = function(sequelize, DataTypes) {
    var InvoiceSender = sequelize.define('InvoiceSender', {
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

    return InvoiceSender;
};
