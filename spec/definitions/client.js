'use strict';

module.exports = {
    'required': [
        'name',
        'address',
        'city',
        'postalCode',
        'phone',
        'iban',
        'bic',
        'language',
        'clientgroup',
        'contact',
        'department',
        'invoiceType',
    ],
    'properties': {
        'name': {
            'type': 'string'
        },
        'address': {
            'type': 'string'
        },
        'city': {
            'type': 'string'
        },
        'postalCode': {
            'type': 'string'
        },
        'phone': {
            'type': 'string'
        },
        'iban': {
            'type': 'string'
        },
        'bic': {
            'type': 'string'
        },
        'contact': {
            'type': 'string'
        },
        'department': {
            'type': 'string'
        },
        'language': {
            'type': 'string',
            'enum': require('../constants/languages')
        },
        'clientgroup': {
            '$ref': '#/definitions/Id'
        },
        'invoiceType': {
            'type': 'string',
            'enum': [
                'email',
                'postal',
            ]
        },
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
