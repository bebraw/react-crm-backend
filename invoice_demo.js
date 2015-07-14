'use strict';
var render = require('./invoice').render;

main();

function main() {
    render({
        ctx: {
            sender: {
                name: 'Demo'
            },
            reference: 'foobar'
        }
    }, function(err, d) {
        if(err) {
            return console.error(err);
        }

        console.log(d);
    });
}

