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
    Invoice.create({
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      assert.equal(invoice.status, 'pending');
      assert.equal(invoice.paymentDays, 14);

      done();
    }).catch(done);
  });

  // TODO: test transformations etc.
});

function noop() {}
