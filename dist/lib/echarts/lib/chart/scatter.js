define('node_modules/echarts/lib/chart/scatter', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/scatter/ScatterSeries');
      require('node_modules/echarts/lib/chart/scatter/ScatterView');
  
      echarts.registerVisual(zrUtil.curry(
          require('node_modules/echarts/lib/visual/symbol'), 'scatter', 'circle', null
      ));
      echarts.registerLayout(zrUtil.curry(
          require('node_modules/echarts/lib/layout/points'), 'scatter'
      ));
  
      // In case developer forget to include grid component
      require('node_modules/echarts/lib/component/grid');
  

});
