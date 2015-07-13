'use strict';
var templates = require('../templates');

module.exports = {
  get: templates.get('invoice'),
  post: templates.post('invoice'),
  put: templates.put('invoice')
};
