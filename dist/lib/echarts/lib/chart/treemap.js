define('node_modules/echarts/lib/chart/treemap', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/treemap/TreemapSeries');
      require('node_modules/echarts/lib/chart/treemap/TreemapView');
      require('node_modules/echarts/lib/chart/treemap/treemapAction');
  
      echarts.registerVisual(require('node_modules/echarts/lib/chart/treemap/treemapVisual'));
  
      echarts.registerLayout(require('node_modules/echarts/lib/chart/treemap/treemapLayout'));
  

});
