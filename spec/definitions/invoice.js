'use strict';

module.exports = {
  required: [
    'status',
    'invoiceId',
    'due',
    'paymentDays',
    'receiver',
    'sender'
  ],
  properties: {
    status: {
      type: 'string',
      'enum': require('../constants/statuses')
    },
    invoiceId: {
      type: 'number',
      description: 'Unique invoice id generated internally by the backend',
      readOnly: true
    },
    due: {
      type: 'string',
      format: 'date',
      description: 'Day in which the invoice is due'
    },
    paymentDays: {
      type: 'number',
      description: 'Amount of days to pay the bill',
      'default': 14
    },
    receiver: {
        '$ref': '#/definitions/Id'
    },
    invoiceReceiver: {
        '$ref': '#/definitions/Id'
    },
    sender: {
        '$ref': '#/definitions/Id'
    },
    invoiceSender: {
        '$ref': '#/definitions/Id'
    },
    createdAt: require('./created'),
    updatedAt: require('./updated')
  }
};
