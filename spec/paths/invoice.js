'use strict';
var templates = require('../templates');

module.exports = {
  get: templates.get('invoice'),
  post: templates.get('invoice'),
  put: templates.get('invoice')
};
