'use strict';

var templates = require('../templates');


module.exports = {
    'get': templates.get('approvedinvoice'),
    // XXXXX: figure out proper semantics for approving (separate resource?)
    /*
    'post': {
        'description': 'This endpoint allows you to send approved invoices.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to POST',
                'schema': {
                    'approvedInvoices': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/definitions/Id'
                        }
                    }
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Ids of the approved invoices',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Id'
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
    */
};
