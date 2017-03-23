define('node_modules/echarts/lib/component/legend', function(require, exports, module) {

  /**
   * Legend component entry file8
   */
  
  
      require('node_modules/echarts/lib/component/legend/LegendModel');
      require('node_modules/echarts/lib/component/legend/legendAction');
      require('node_modules/echarts/lib/component/legend/LegendView');
  
      var echarts = require('node_modules/echarts/lib/echarts');
      // Series Filter
      echarts.registerProcessor(require('node_modules/echarts/lib/component/legend/legendFilter'));
  

});
