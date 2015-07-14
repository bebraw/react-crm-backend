'use strict';
var moment = require('moment');

var render = require('./invoice').render;

main();

function main() {
    render({
        ctx: {
            sender: {
                name: 'Sender',
                address: 'Sender address',
                postalCode: '12345',
                city: 'City',
                phone: '+1234567890',
                iban: 'IBAN',
                bic: 'BIC',
                companyId: 'company id'
            },
            date: moment().format('DD.MM.YYYY'),
            reference: 'reference',
            recipient: {
                name: 'Receiver',
                address: 'Receiver address',
                postalCode: '12345',
                city: 'City',
                phone: '+1234567890',
                companyId: 'company id'
            },
            products: [
                {
                    name: 'Demo product',
                    cost: 100,
                    vat: 24,
                    vatCost: 24,
                    total: 124
                }
            ]
        }
    }, function(err, d) {
        if(err) {
            return console.error(err);
        }

        console.log(d);
    });
}

