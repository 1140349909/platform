define('node_modules/echarts/lib/component/singleAxis', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/coord/single/singleCreator');
      require('node_modules/echarts/lib/component/axis/SingleAxisView');
      require('node_modules/echarts/lib/coord/single/AxisModel');
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      echarts.extendComponentView({
          type: 'single'
      });
  
  

});
