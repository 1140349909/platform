define('node_modules/echarts/lib/component/toolbox/featureManager', function(require, exports, module) {

  'use strict';
  
  
      var features = {};
  
      module.exports = {
          register: function (name, ctor) {
              features[name] = ctor;
          },
  
          get: function (name) {
              return features[name];
          }
      };
  

});
