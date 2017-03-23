define('node_modules/echarts/lib/component/markArea', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/component/marker/MarkAreaModel');
      require('node_modules/echarts/lib/component/marker/MarkAreaView');
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(function (opt) {
          // Make sure markArea component is enabled
          opt.markArea = opt.markArea || {};
      });
  

});
