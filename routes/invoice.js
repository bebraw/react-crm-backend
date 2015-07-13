'use strict';
var swaggerify = require('swaggerify').routes;

var templates = require('./templates');


module.exports = function(imports) {
  var model = imports.models.Invoice;

  return swaggerify('invoice', {
    get: templates.get(model),
    post: templates.post(model),
    put: put(model),
  });
};

function put(model) {
  return function(req, res) {
    var body = req.swagger.params.body.value;
    var bodyId = body.id;

    delete body.id;

    // TODO: check current status before operating

    model.findOne({
      id: bodyId
    }).then(function(result) {
      var dataValues = result.dataValues;

      if(dataValues.status === 'paid' && body.status !== 'paid') {
        return res.status(403).json({
          message: 'Changing paid status is not allowed',
          errors: [],
          warnings: []
        });
      }

      if(dataValues.status === 'pending' && body.status === 'paid') {
        return res.status(403).json({
          message: 'Changing pending status to paid is not allowed',
          errors: [],
          warnings: []
        });
      }

      if(dataValues.status === 'approved' && body.status === 'pending') {
        return res.status(403).json({
          message: 'Changing approved status to pending is not allowed',
          errors: [],
          warnings: []
        });
      }

      // XXX: allow body modifications if approval is ok
      if(dataValues.status === 'pending' && body.status === 'approved') {
        return model.build(body).approve().then(function(d) {
          res.json(d.dataValues);
        }).catch(function() {
          res.status(403).json({
            message: 'Failed to approve'
          });
        });
      }
      // XXXXX: use this instead of above logic for payment
      /*
      if(dataValues.status !== 'paid' && body.status === 'paid') {
        return model.build(body).pay().then(function(d) {
          res.json(d.dataValues);
        }).catch(function() {
          res.status(403).json({
            message: 'Failed to pay'
          });
        });
      }
      */

      model.update(body, {
        where: {
          id: bodyId
        }
      }).then(function(ids) {
        var id = ids[0];

        if(id) {
          model.findOne({
            id: id
          }).then(function(r) {
            res.json(r.dataValues);
          }).catch(function(err) {
            res.status(403).json({
              message: err.message,
              errors: err.errors,
              warnings: []
            });
          });
        }
        else {
          // TODO: specify this case better
          res.status(403).json({
            message: 'NOT_FOUND'
          });
        }
      }).catch(function(err) {
        res.status(403).json({
          message: err.message,
          errors: err.errors,
          warnings: []
        });
      });
    }).catch(function(err) {
      res.status(403).json({
        message: err.message,
        errors: err.errors,
        warnings: []
      });
    });
  };
}
