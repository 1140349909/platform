define('node_modules/echarts/lib/component/markPoint', function(require, exports, module) {

  // HINT Markpoint can't be used too much
  
  
      require('node_modules/echarts/lib/component/marker/MarkPointModel');
      require('node_modules/echarts/lib/component/marker/MarkPointView');
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(function (opt) {
          // Make sure markPoint component is enabled
          opt.markPoint = opt.markPoint || {};
      });
  

});
