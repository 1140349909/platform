define('common/util/urlParser', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  exports['default'] = {
      parseILokaUrl: function parseILokaUrl(path) {
          return 'http://' + _commonConfig2['default'].ILOKA_HOST + path;
      }
  };
  module.exports = exports['default'];

});
