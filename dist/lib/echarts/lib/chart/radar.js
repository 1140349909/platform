define('node_modules/echarts/lib/chart/radar', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      // Must use radar component
      require('node_modules/echarts/lib/component/radar');
  
      require('node_modules/echarts/lib/chart/radar/RadarSeries');
      require('node_modules/echarts/lib/chart/radar/RadarView');
  
      echarts.registerVisual(zrUtil.curry(require('node_modules/echarts/lib/visual/dataColor'), 'radar'));
      echarts.registerVisual(zrUtil.curry(
          require('node_modules/echarts/lib/visual/symbol'), 'radar', 'circle', null
      ));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/radar/radarLayout'));
  
      echarts.registerProcessor(
          zrUtil.curry(require('node_modules/echarts/lib/processor/dataFilter'), 'radar')
      );
  
      echarts.registerPreprocessor(require('node_modules/echarts/lib/chart/radar/backwardCompat'));
  

});
