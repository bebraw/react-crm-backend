'use strict';


module.exports = {
    'required': [
        'client',
        'cost',
    ],
    'properties': {
        'client': {
            '$ref': '#/definitions/Id'
        },
        'cost': {
            'type': 'number'
        },
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
