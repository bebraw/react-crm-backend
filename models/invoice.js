'use strict';

module.exports = function(sequelize, DataTypes) {
    var Invoice = sequelize.define('Invoice', {
            status: DataTypes.ENUM('pending', 'approved', 'paid'),
            invoiceId: DataTypes.INTEGER,
            due: DataTypes.STRING,
            paymentDays: DataTypes.INTEGER,
        },
        {
            classMethods: {
                associate: function(models) {
                    // all of these should be unique to this model
                    // this data is attached when changing status from pending to approved

                    // TODO: InvoiceReceiver -> copy of Client
                    Invoice.hasOne(models.Client, {
                        constraints: false, // not set initially
                        as: 'receiver',
                    });

                    // TODO: InvoiceSender -> copy of User
                    Invoice.hasOne(models.User, {
                        constraints: false, // not set initially
                        as: 'sender',
                    });

                    // TODO
                    /*
                    Invoice.hasMany(models.InvoiceItem, {
                        constraints: false, // not set initially
                        as: 'invoiceItems',
                    });
                    */
                },
            },
        }
    );

    return Invoice;
};
