define('node_modules/symbol-observable/index', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  /* global window */
  'use strict';
  
  module.exports = require('node_modules/symbol-observable/ponyfill')(global || window || this);
  

});
