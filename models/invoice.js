'use strict';
var Promise = require('bluebird');

module.exports = function(sequelize, DataTypes) {
    var Invoice = sequelize.define('Invoice', {
            status: {
                type: DataTypes.ENUM('pending', 'approved', 'paid'),
                allowNull: false,
                defaultValue: 'pending',
            },
            invoiceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            due: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            paymentDays: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 14,
            },
        },
        {
            classMethods: {
                associate: function(models) {
                    Invoice.belongsTo(models.Client, {
                        foreignKey: {
                            name: 'receiver',
                            allowNull: false,
                        },
                    });
                    // copy of Client created during approval
                    Invoice.belongsTo(models.InvoiceReceiver, {
                        foreignKey: {
                            name: 'invoiceReceiver',
                            allowNull: true,
                        },
                        constraints: false, // not set initially
                    });
                    Invoice.belongsTo(models.User, {
                        foreignKey: {
                            name: 'sender',
                            allowNull: false,
                        },
                    });

                    // copy of User created during approval
                    Invoice.belongsTo(models.InvoiceSender, {
                        foreignKey: {
                            name: 'invoiceSender',
                            allowNull: true,
                        },
                        constraints: false, // not set initially
                    });

                    // TODO
                    /*
                    Invoice.hasMany(models.InvoiceItem, {
                        constraints: false, // not set initially
                        as: 'invoiceItems',
                    });*/
                },
            },
            instanceMethods: {
                approve: function() {
                    var invoice = this.dataValues;

                    return Invoice.update({
                        status: 'approved',
                    }, {
                        where: {
                            id: invoice.id,
                        },
                    }).then(function(ids) {
                        var id = ids[0];

                        return Invoice.findOne({
                            id: id,
                        });
                    });
                },
                pay: function() {
                    var invoice = this.dataValues;

                    if(invoice.status !== 'approved') {
                        return Promise.reject(new Error('Tried to a non-approved invoice'));
                    }

                    return Invoice.update({
                        status: 'paid',
                    }, {
                        where: {
                            id: invoice.id,
                        }
                    }).then(function(ids) {
                        var id = ids[0];

                        return Invoice.findOne({
                            id: id,
                        });
                    });
                }
            },
        }
    );

    return Invoice;
};
