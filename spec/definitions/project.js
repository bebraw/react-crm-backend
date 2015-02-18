'use strict';


module.exports = {
    'required': [
        'client',
        'cost',
    ],
    'properties': {
        'client': require('./id'),
        'cost': {
            'type': 'number'
        },
        'createdAt': require('./created'),
        'updatedAt': require('./updated')
    }
};
