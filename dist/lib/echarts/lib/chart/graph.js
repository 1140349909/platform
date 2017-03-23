define('node_modules/echarts/lib/chart/graph', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      require('node_modules/echarts/lib/chart/graph/GraphSeries');
      require('node_modules/echarts/lib/chart/graph/GraphView');
  
      require('node_modules/echarts/lib/chart/graph/roamAction');
  
      echarts.registerProcessor(require('node_modules/echarts/lib/chart/graph/categoryFilter'));
  
      echarts.registerVisual(zrUtil.curry(
          require('node_modules/echarts/lib/visual/symbol'), 'graph', 'circle', null
      ));
      echarts.registerVisual(require('node_modules/echarts/lib/chart/graph/categoryVisual'));
      echarts.registerVisual(require('node_modules/echarts/lib/chart/graph/edgeVisual'));
  
      echarts.registerLayout(require('node_modules/echarts/lib/chart/graph/simpleLayout'));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/graph/circularLayout'));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/graph/forceLayout'));
  
      // Graph view coordinate system
      echarts.registerCoordinateSystem('graphView', {
          create: require('node_modules/echarts/lib/chart/graph/createView')
      });
  

});
