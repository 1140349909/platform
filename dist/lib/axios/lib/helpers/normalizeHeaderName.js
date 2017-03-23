define('node_modules/axios/lib/helpers/normalizeHeaderName', function(require, exports, module) {

  'use strict';
  
  var utils = require('node_modules/axios/lib/utils');
  
  module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  

});
