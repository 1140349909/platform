define('node_modules/echarts/lib/chart/boxplot', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/boxplot/BoxplotSeries');
      require('node_modules/echarts/lib/chart/boxplot/BoxplotView');
  
      echarts.registerVisual(require('node_modules/echarts/lib/chart/boxplot/boxplotVisual'));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/boxplot/boxplotLayout'));
  
  

});
