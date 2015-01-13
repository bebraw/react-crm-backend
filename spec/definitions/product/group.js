'use strict';


module.exports = {
    'required': [
        'name',
        'description'
    ],
    'properties': {
        'id': require('../id'),
        'name': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'createdAt': require('../created'),
        'updatedAt': require('../updated')
    }
};
