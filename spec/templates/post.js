'use strict';
var titleCase = require('title-case');


module.exports = function(name) {
    var titledName = titleCase(name);

    return {
        'description': 'The ' + titledName + 's endpoint allows you to create a new ' + name +
            ' to the system.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The ' + titledName + ' JSON you want to POST',
                'schema': {
                    '$ref': '#/definitions/' + titledName
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the created ' + name,
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
    };
};
