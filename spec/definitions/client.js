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
            'type': 'string'
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
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
