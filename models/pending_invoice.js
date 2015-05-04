'use strict';

module.exports = function(sequelize, DataTypes) {
    var PendingInvoice = sequelize.define('PendingInvoice', {
            invoiceId: DataTypes.INTEGER,
            due: DataTypes.STRING,
            paymentDays: DataTypes.INTEGER,
            // TODO: items (InvoiceItem)
        },
        {
            classMethods: {
                associate: function(models) {
                    // XXX
                    PendingInvoice.belongsTo(models.Client, {
                        constraints: false,
                        foreignKey: 'receiver',
                    });

                    // XXX
                    PendingInvoice.belongsTo(models.User, {
                        constraints: false,
                        foreignKey: 'sender',
                    });
                }
            }
        }
    );

    return PendingInvoice;
};
