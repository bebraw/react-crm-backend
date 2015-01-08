'use strict';
var languages = require('../constants/languages');


module.exports = {
    'required': [
        'name',
        'address',
        'city',
        'postalCode',
        'phone',
        'companyId',
        'iban',
        'bic',
        'language'
    ],
    'properties': {
        'id': require('./id'),
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
        'companyId': {
            '$ref': '#/definitions/Id'
        },
        'iban': {
            'type': 'string'
        },
        'bic': {
            'type': 'string'
        },
        'language': {
            'type': 'string',
            'enum': languages
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
