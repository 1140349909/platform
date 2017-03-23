define('node_modules/history/lib/deprecate', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _warning = require('node_modules/history/node_modules/warning/browser');
  
  var _warning2 = _interopRequireDefault(_warning);
  
  function deprecate(fn, message) {
    return function () {
      'development' !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
      return fn.apply(this, arguments);
    };
  }
  
  exports['default'] = deprecate;
  module.exports = exports['default'];

});
