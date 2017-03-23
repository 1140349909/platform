define('node_modules/echarts/lib/chart/lines', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/chart/lines/LinesSeries');
      require('node_modules/echarts/lib/chart/lines/LinesView');
  
      var echarts = require('node_modules/echarts/lib/echarts');
      echarts.registerLayout(
          require('node_modules/echarts/lib/chart/lines/linesLayout')
      );
  

});
