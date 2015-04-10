'use strict';

module.exports = function(sequelize, DataTypes) {
    var PendingInvoice = sequelize.define('PendingInvoice', {
            invoiceId: DataTypes.INTEGER,
            due: DataTypes.STRING,
            paymentDays: DataTypes.INTEGER
            // TODO: status enum
            // TODO: sender (User)
            // TODO: items (InvoiceItem)
        }
    );

    PendingInvoice.belongsTo(sequelize.models.Client, {
        foreignKey: 'receiver',
    });

    return PendingInvoice;
};
