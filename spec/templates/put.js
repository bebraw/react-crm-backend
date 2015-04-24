'use strict';
var titleCase = require('title-case');


module.exports = function(name) {
    var titledName = titleCase(name);

    return {
        'description': 'The ' + titledName + 's endpoint allows you to update a ' + name +
            ' already existing in the system.',
        'parameters': [
            {
                'name': 'body',
                'in': 'body',
                'description': 'The ' + titledName + ' JSON you want to PUT',
                'schema': {
                    '$ref': '#/definitions/' + titledName
                },
                'required': true
            }
        ],
        'responses': {
            '200': {
                'description': 'Id of the updated ' + name,
                'schema': {
                    '$ref': '#/definitions/' + titledName
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
