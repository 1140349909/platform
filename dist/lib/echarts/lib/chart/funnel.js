define('node_modules/echarts/lib/chart/funnel', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/funnel/FunnelSeries');
      require('node_modules/echarts/lib/chart/funnel/FunnelView');
  
      echarts.registerVisual(zrUtil.curry(require('node_modules/echarts/lib/visual/dataColor'), 'funnel'));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/funnel/funnelLayout'));
  
      echarts.registerProcessor(zrUtil.curry(require('node_modules/echarts/lib/processor/dataFilter'), 'funnel'));
  

});
