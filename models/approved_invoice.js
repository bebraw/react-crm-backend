'use strict';

module.exports = function(sequelize, DataTypes) {
    var ApprovedInvoice = sequelize.define('ApprovedInvoice', {
            invoiceId: DataTypes.INTEGER,
            due: DataTypes.STRING,
            paymentDays: DataTypes.INTEGER
            // TODO: sender (User) - copy!
            // TODO: receiver (Client) - copy!
            // TODO: items (InvoiceItem)
        }
    );

    return ApprovedInvoice;
};
