define('node_modules/echarts/lib/component/markLine', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/component/marker/MarkLineModel');
      require('node_modules/echarts/lib/component/marker/MarkLineView');
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(function (opt) {
          // Make sure markLine component is enabled
          opt.markLine = opt.markLine || {};
      });
  

});
