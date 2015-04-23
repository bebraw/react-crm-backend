'use strict';
var languages = require('../constants/languages');


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
        'clientgroup'
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
        'language': {
            'type': 'string',
            'enum': languages
        },
        'clientgroup': {
            '$ref': '#/definitions/Id'
        },
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
