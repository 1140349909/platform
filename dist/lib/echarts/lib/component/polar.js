define('node_modules/echarts/lib/component/polar', function(require, exports, module) {

  'use strict';
  
  
      require('node_modules/echarts/lib/coord/polar/polarCreator');
      require('node_modules/echarts/lib/component/angleAxis');
      require('node_modules/echarts/lib/component/radiusAxis');
  
      // Polar view
      require('node_modules/echarts/lib/echarts').extendComponentView({
          type: 'polar'
      });
  

});
