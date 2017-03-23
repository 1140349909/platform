define('node_modules/echarts/lib/chart/pie', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/pie/PieSeries');
      require('node_modules/echarts/lib/chart/pie/PieView');
  
      require('node_modules/echarts/lib/action/createDataSelectAction')('pie', [{
          type: 'pieToggleSelect',
          event: 'pieselectchanged',
          method: 'toggleSelected'
      }, {
          type: 'pieSelect',
          event: 'pieselected',
          method: 'select'
      }, {
          type: 'pieUnSelect',
          event: 'pieunselected',
          method: 'unSelect'
      }]);
  
      echarts.registerVisual(zrUtil.curry(require('node_modules/echarts/lib/visual/dataColor'), 'pie'));
  
      echarts.registerLayout(zrUtil.curry(
          require('node_modules/echarts/lib/chart/pie/pieLayout'), 'pie'
      ));
  
      echarts.registerProcessor(zrUtil.curry(require('node_modules/echarts/lib/processor/dataFilter'), 'pie'));
  

});
