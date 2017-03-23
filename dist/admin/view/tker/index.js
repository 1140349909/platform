define('admin/view/tker/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _config = require('admin/view/tker/config.jsx');
  
  var _config2 = _interopRequireDefault(_config);
  
  var _member = require('admin/view/tker/member.jsx');
  
  var _member2 = _interopRequireDefault(_member);
  
  var _product = require('admin/view/tker/product.jsx');
  
  var _product2 = _interopRequireDefault(_product);
  
  '';
  
  exports['default'] = {
      Config: _config2['default'],
      Member: _member2['default'],
      Product: _product2['default']
  };
  module.exports = exports['default'];

});
