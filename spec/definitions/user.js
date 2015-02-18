'use strict';


module.exports = {
    'required': [
        'name',
        'invoicingId',
    ],
    'properties': {
        'name': {
            'type': 'string'
        },
        'invoicingId': {
            'type': 'number',
            'description': 'Invoicing id that is unique per user'
        }
    }
};
