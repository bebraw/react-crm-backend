'use strict';


module.exports = {
    'get': {
        'description': 'This endpoint returns information about invoices that have been sent. The response includes basic details of each invoice, such as sender and receiver information.',
        'responses': {
            '200': {
                'description': 'An array of sent invoices',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/InvoiceSent'
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
    },
    'post': {
        'description': 'This endpoint allows you to send pending invoices.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to POST',
                'schema': {
                    'pendingInvoices': {
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
                'description': 'Ids of the sent invoices',
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
};
