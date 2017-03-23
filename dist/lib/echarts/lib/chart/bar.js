define('node_modules/echarts/lib/chart/bar', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      require('node_modules/echarts/lib/coord/cartesian/Grid');
  
      require('node_modules/echarts/lib/chart/bar/BarSeries');
      require('node_modules/echarts/lib/chart/bar/BarView');
  
      var barLayoutGrid = require('node_modules/echarts/lib/layout/barGrid');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      echarts.registerLayout(zrUtil.curry(barLayoutGrid, 'bar'));
      // Visual coding for legend
      echarts.registerVisual(function (ecModel) {
          ecModel.eachSeriesByType('bar', function (seriesModel) {
              var data = seriesModel.getData();
              data.setVisual('legendSymbol', 'roundRect');
          });
      });
  
      // In case developer forget to include grid component
      require('node_modules/echarts/lib/component/grid');
  

});
