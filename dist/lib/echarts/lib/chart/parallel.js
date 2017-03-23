define('node_modules/echarts/lib/chart/parallel', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/component/parallel');
  
      require('node_modules/echarts/lib/chart/parallel/ParallelSeries');
      require('node_modules/echarts/lib/chart/parallel/ParallelView');
  
      echarts.registerVisual(require('node_modules/echarts/lib/chart/parallel/parallelVisual'));
  
  

});
