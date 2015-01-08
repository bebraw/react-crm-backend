'use strict';
var languages = require('../constants/languages');


module.exports = {
    'get': {
        'description': 'Languages of the system',
        'responses': {
            '200': {
                'description': 'An array of languages',
                'schema': {
                    'type': 'array',
                    'items': {
                        'type': 'string',
                        'enum': languages,
                        'readOnly': true
                    }
                }
            },
            'default': {
                'description': 'Unexpected error',
                'schema': {
                    '$ref': '#/definitions/Error'
                }
            }
        }
    }
};
