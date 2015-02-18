'use strict';
var titleCase = require('title-case');


module.exports = function(name) {
    var titledName = titleCase(name);

    return {
        'description': 'The ' + titledName + 's endpoint returns information about ' +
            name + 's the user is affiliated with. The response includes basic details of each ' +
            name + ' in chronological order.\n',
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
                'name': 'page',
                'description': 'The index of page to show',
                'required': false,
                'type': 'integer',
                'default': 0
            },
            {
                'in': 'query',
                'name': 'perPage',
                'description': 'The amount of ' + name + 's per page',
                'required': false,
                'type': 'integer',
                'default': 10
            }
        ],
        'responses': {
            '200': {
                'description': 'An array of ' + name + 's',
                'schema': {
                    '$ref': '#/definitions/' + titledName
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
    };
}