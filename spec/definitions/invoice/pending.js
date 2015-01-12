'use strict';
var invoiceStatuses = require('../../constants/invoice_statuses');


module.exports = {
    'required': [
        'sender',
        'receiver',
        'items',
        'due',
        'paymentDays'
    ],
    'properties': {
        'id': require('../id'),
        'invoiceId': {
            'type': 'number',
            'description': 'Unique invoice id generated internally by the backend',
            'readOnly': true
        },
        'status': {
            'type': 'string',
            'enum': invoiceStatuses,
            'readOnly': true
        },
        'sender': {
            '$ref': '#/definitions/Id'
        },
        'receiver': {
            '$ref': '#/definitions/Id'
        },
        'items': {
            'type': 'array',
            'minItems': 1,
            'items': {
                '$ref': '#/definitions/InvoiceItem'
            }
        },
        'due': {
            'type': 'string',
            'format': 'date',
            'description': 'Day in which the invoice is due'
        },
        'paymentDays': {
            'type': 'number',
            'description': 'Amount of days to pay the bill',
            'default': 8
        },
        'createdAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the invoice was created at',
            'readOnly': true
        },
        'updatedAt': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Day in which the invoice was updated',
            'readOnly': true
        }
    }
};
