'use strict';


module.exports = {
    'get': {
        'description': 'The Clients endpoint returns information about clients the user is affiliated with. The response includes basic details of each client, such as name, in chronological order.\n',
        'parameters': [
            {
                'in': 'query',
                'name': 'sortBy',
                'description': 'Name of field to sort with. Add - in front for inverse',
                'required': false,
                'type': 'string'
            },
            {
                'in': 'query',
                'name': 'count',
                'description': 'If set, count will be returned in `Total-Count`',
                'required': false,
                'type': 'boolean'
            }
        ],
        'responses': {
            '200': {
                'description': 'An array of clients',
                'schema': {
                    'type': 'array',
                    'items': {
                        '$ref': '#/definitions/Client'
                    }
                },
                'headers': {
                    'Total-Count': {
                        'description': 'Total count',
                        'type': 'integer'
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
        'description': 'The Clients endpoint allows you to create a new client to the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Client JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/Client'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created client',
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
        'description': 'The Clients endpoint allows you to update a client already existing in the system.\n',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The Client JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/Client'
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated client',
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
