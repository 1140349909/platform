define('node_modules/echarts/lib/chart/effectScatter', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/effectScatter/EffectScatterSeries');
      require('node_modules/echarts/lib/chart/effectScatter/EffectScatterView');
  
      echarts.registerVisual(zrUtil.curry(
          require('node_modules/echarts/lib/visual/symbol'), 'effectScatter', 'circle', null
      ));
      echarts.registerLayout(zrUtil.curry(
          require('node_modules/echarts/lib/layout/points'), 'effectScatter'
      ));
  

});
