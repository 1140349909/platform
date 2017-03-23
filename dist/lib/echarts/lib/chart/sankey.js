define('node_modules/echarts/lib/chart/sankey', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/sankey/SankeySeries');
      require('node_modules/echarts/lib/chart/sankey/SankeyView');
      echarts.registerLayout(require('node_modules/echarts/lib/chart/sankey/sankeyLayout'));
      echarts.registerVisual(require('node_modules/echarts/lib/chart/sankey/sankeyVisual'));
  

});
