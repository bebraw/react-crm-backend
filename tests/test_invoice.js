'use strict';
var assert = require('assert');

var config = require('../config');

config.database.test.logging = noop;

var models = require('../models')(config.database.test);
var Client = models.Client;
var Invoice = models.Invoice;
var User = models.User;

// TODO: delete test db physically before running any tests. it's possible for
// it to become corrupted

describe('Invoice', function() {
  var client, user;

  beforeEach(function(done) {
    // nuke possible db
    models.sequelize.sync({force: true}).finally(function() {
      createClientAndUser(function(newClient, newUser) {
        client = newClient;
        user = newUser;

        done();
      });
    });
  });

  it('should be able to create an invoice', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      assert.equal(invoice.status, 'pending');
      assert.equal(invoice.paymentDays, 14);

      done();
    }).catch(done);
  });

  it('should be possible to approve a pending invoice', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      status: 'pending',
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      Invoice.build(invoice).approve().then(function(ret) {
        assert.equal(ret.status, 'approved');

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should be possible to pay an approved invoice', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      status: 'approved',
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      Invoice.build(invoice).pay().then(function(ret) {
        assert.equal(ret.status, 'paid');

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should not be possible to mark a pending invoice as paid', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      status: 'pending',
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      Invoice.build(invoice).pay().then(function() {
        done(new Error('marked paid even though shouldn\'t have'));
      }).catch(done.bind(null, null)); // should raise an Error
    }).catch(done);
  });
});

describe('Approved Invoice', function() {
  var client, user;

  beforeEach(function(done) {
    // nuke possible db
    models.sequelize.sync({force: true}).finally(function() {
      createClientAndUser(function(newClient, newUser) {
        client = newClient;
        user = newUser;

        done();
      });
    });
  });

  it('should contain a copy of sender information', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      status: 'pending',
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      Invoice.build(invoice).approve().then(function(ret) {
        // TODO: check against sender

        done();
      }).catch(done);
    }).catch(done);
  });

  it('should contain a copy of receiver information', function(done) {
    Invoice.create({
      receiver: client.id,
      sender: user.id,
      status: 'pending',
      invoiceId: 0,
      due: new Date(),
    }).then(function(result) {
      var invoice = result.dataValues;

      Invoice.build(invoice).approve().then(function(ret) {
        // TODO: check against receiver

        done();
      }).catch(done);
    }).catch(done);
  });
});

function createClientAndUser(cb) {
  Client.create({}).then(function(result1) {
    var client = result1.dataValues;

    User.create({}).then(function(result2) {
      var user = result2.dataValues;

      cb(client, user);
    });
  });
}

function noop() {}
