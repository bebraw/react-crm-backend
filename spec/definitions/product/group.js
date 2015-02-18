'use strict';


module.exports = {
    'required': [
        'name',
        'description'
    ],
    'properties': {
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
