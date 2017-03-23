define('node_modules/echarts/lib/ExtensionAPI', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      var echartsAPIList = [
          'getDom', 'getZr', 'getWidth', 'getHeight', 'dispatchAction', 'isDisposed',
          'on', 'off', 'getDataURL', 'getConnectedDataURL', 'getModel', 'getOption'
      ];
  
      function ExtensionAPI(chartInstance) {
          zrUtil.each(echartsAPIList, function (name) {
              this[name] = zrUtil.bind(chartInstance[name], chartInstance);
          }, this);
      }
  
      module.exports = ExtensionAPI;
  

});
