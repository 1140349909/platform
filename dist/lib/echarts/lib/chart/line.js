define('node_modules/echarts/lib/chart/line', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
      var PRIORITY = echarts.PRIORITY;
  
      require('node_modules/echarts/lib/chart/line/LineSeries');
      require('node_modules/echarts/lib/chart/line/LineView');
  
      echarts.registerVisual(zrUtil.curry(
          require('node_modules/echarts/lib/visual/symbol'), 'line', 'circle', 'line'
      ));
      echarts.registerLayout(zrUtil.curry(
          require('node_modules/echarts/lib/layout/points'), 'line'
      ));
  
      // Down sample after filter
      echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, zrUtil.curry(
          require('node_modules/echarts/lib/processor/dataSample'), 'line'
      ));
  
      // In case developer forget to include grid component
      require('node_modules/echarts/lib/component/grid');
  

});
