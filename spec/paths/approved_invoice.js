'use strict';


module.exports = {
    'get': {
        'description': 'This endpoint returns information about invoices that have been approved. The response includes basic details of each invoice, such as sender and receiver information.',
        'responses': {
            '200': {
                'description': 'An array of approved invoices',
                'schema': {
                    '$ref': '#/definitions/InvoiceApproved'
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
        'description': 'This endpoint allows you to send approved invoices.',
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
};
