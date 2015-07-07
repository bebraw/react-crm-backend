'use strict';
var assert = require('assert');

var config = require('../config');

config.database.test.logging = noop;

var models = require('../models')(config.database.test);
var Invoice = models.Invoice;

describe('Invoice', function() {
  beforeEach(function(done) {
    // nuke possible db
    models.sequelize.sync({force: true}).finally(done);
  });

  it('should be able to create an invoice', function(done) {
    // TODO
    console.log('should be able to create an invoice');

    Invoice.create().then(function(result) {
      done();
    }).catch(done);
  });

  // TODO: test transformations etc.
});

function noop() {}
