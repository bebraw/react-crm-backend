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
                    PendingInvoice.belongsTo(models.Client, {
                        constraints: false,
                        foreignKey: 'receiver',
                    });

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
