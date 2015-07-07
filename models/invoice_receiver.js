'use strict';

module.exports = function(sequelize, DataTypes) {
    var InvoiceReceiver = sequelize.define('InvoiceReceiver', {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            postalCode: DataTypes.STRING,
            phone: DataTypes.STRING,
            iban: DataTypes.STRING,
            bic: DataTypes.STRING,
            contact: DataTypes.STRING,
            department: DataTypes.STRING,
            language: DataTypes.STRING,
            invoiceType: DataTypes.STRING,
        }
    );

    return InvoiceReceiver;
};
