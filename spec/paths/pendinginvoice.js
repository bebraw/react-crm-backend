'use strict';


module.exports = {
    'get': {
        'description': 'This endpoint returns information about invoices that are pending (ie. not sent yet). The response includes basic details of each invoice, such as sender and receiver information.\n',
        'responses': {
            '200': {
                'description': 'An array of pending invoices',
                'schema': {
                    '$ref': '#/definitions/Pendinginvoice'
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
        'description': 'The Invoices endpoint allows you to create a new client to the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/Pendinginvoice'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created invoice',
                'schema': {
                    'properties': {
                        'id': {
                            '$ref': '#/definitions/Id'
                        }
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
    'put': {
        'description': 'The Invoices endpoint allows you to update an invoice already existing in the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Invoice JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/Pendinginvoice'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated invoice',
                'schema': {
                    'properties': {
                        'id': {
                            '$ref': '#/definitions/Id'
                        }
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
