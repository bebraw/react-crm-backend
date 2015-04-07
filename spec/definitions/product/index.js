'use strict';


module.exports = {
    'required': [
        'name',
        'description',
        'purchasePrice',
        'sellingPrice',
        'priceChanged',
        'vat',
        'group',
        'inStock'
    ],
    'properties': {
        'name': {
            'type': 'string'
        },
        'description': {
            'type': 'string'
        },
        'purchasePrice': {
            'type': 'number'
        },
        'sellingPrice': {
            'type': 'number'
        },
        'priceChanged': {
            'type': 'string',
            'format': 'date-time',
            'description': 'Date when price of the product changed'
        },
        'vat': {
            'type': 'number',
            'description': 'VAT of the product'
        },
        'group': require('../id'),
        'inStock': {
            'type': 'boolean',
            'description': 'Is the product in the stock'
        },
        'createdAt': require('../created'),
        'updatedAt': require('../updated')
    }
};
