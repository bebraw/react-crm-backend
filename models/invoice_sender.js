'use strict';

module.exports = function(sequelize, DataTypes) {
    var InvoiceSender = sequelize.define('InvoiceSender', {
            name: DataTypes.STRING,
            invoicingId: DataTypes.INTEGER,
        }
    );

    return InvoiceSender;
};
