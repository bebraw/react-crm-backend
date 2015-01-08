'use strict';
var invoiceStatuses = require('../../constants/invoice_statuses');


module.exports = {
    'type': 'string',
    'enum': invoiceStatuses
};
