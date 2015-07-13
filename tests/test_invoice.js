'use strict';
//var assert = require('assert');
var connect = require('./rest_template').connect;

describe('Invoice REST API', function() {
  var urlRoot = 'http://localhost';
  var port = 3456;

  connect(urlRoot, port, 'invoice');

  it('should be able to POST an invoice', function(done) {
    // TODO
    console.log(this.resource);

    done();
  });

  it('should be able to GET an invoice', function(done) {
    // TODO
    done();
  });

  it('should be able to PUT an invoice', function(done) {
    // TODO
    done();
  });

  it('should be able to approve an invoice', function(done) {
    // TODO
    done();
  });

  it('should be able to mark an invoice as paid', function(done) {
    // TODO
    done();
  });
});
