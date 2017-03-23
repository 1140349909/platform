define('admin/view/product/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _list = require('admin/view/product/list.jsx');
  
  var _list2 = _interopRequireDefault(_list);
  
  var _add = require('admin/view/product/add.jsx');
  
  var _add2 = _interopRequireDefault(_add);
  
  var _sale = require('admin/view/product/sale.jsx');
  
  var _sale2 = _interopRequireDefault(_sale);
  
  exports['default'] = {
      List: _list2['default'],
      Add: _add2['default'],
      Sale: _sale2['default']
  };
  module.exports = exports['default'];

});
