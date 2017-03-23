define('node_modules/echarts/index', function(require, exports, module) {

  /**
   * Export echarts as CommonJS module
   */
  module.exports = require('node_modules/echarts/lib/echarts');
  
  // Import all charts and components
  require('node_modules/echarts/lib/chart/line');
  require('node_modules/echarts/lib/chart/bar');
  require('node_modules/echarts/lib/chart/pie');
  require('node_modules/echarts/lib/chart/scatter');
  require('node_modules/echarts/lib/chart/radar');
  
  require('node_modules/echarts/lib/chart/map');
  require('node_modules/echarts/lib/chart/treemap');
  require('node_modules/echarts/lib/chart/graph');
  require('node_modules/echarts/lib/chart/gauge');
  require('node_modules/echarts/lib/chart/funnel');
  require('node_modules/echarts/lib/chart/parallel');
  require('node_modules/echarts/lib/chart/sankey');
  require('node_modules/echarts/lib/chart/boxplot');
  require('node_modules/echarts/lib/chart/candlestick');
  require('node_modules/echarts/lib/chart/effectScatter');
  require('node_modules/echarts/lib/chart/lines');
  require('node_modules/echarts/lib/chart/heatmap');
  
  require('node_modules/echarts/lib/component/grid');
  require('node_modules/echarts/lib/component/legend');
  require('node_modules/echarts/lib/component/tooltip');
  require('node_modules/echarts/lib/component/polar');
  require('node_modules/echarts/lib/component/geo');
  require('node_modules/echarts/lib/component/parallel');
  require('node_modules/echarts/lib/component/singleAxis');
  require('node_modules/echarts/lib/component/brush');
  
  require('node_modules/echarts/lib/component/title');
  
  require('node_modules/echarts/lib/component/dataZoom');
  require('node_modules/echarts/lib/component/visualMap');
  
  require('node_modules/echarts/lib/component/markPoint');
  require('node_modules/echarts/lib/component/markLine');
  require('node_modules/echarts/lib/component/markArea');
  
  require('node_modules/echarts/lib/component/timeline');
  require('node_modules/echarts/lib/component/toolbox');
  
  require('node_modules/zrender/lib/vml/vml');
  

});
