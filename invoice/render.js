'use strict';
require('node-jsx').install();
var pdf = require('html-pdf');

module.exports = function(o, cb) {
  var lang = o.ctx.language || 'fi';
  var tpl = require('./template_' + lang +'.jsx');

  o.ctx = o.ctx || {};
  o.filename = o.filename || 'tmp.pdf';
  o.format = o.format || 'A4';

  var html = tpl(o.ctx);

  pdf.create(html, o).toFile(cb);

  // 1. convert jsx to html by passing data to render through props
  // 2. render html as pdf
};
