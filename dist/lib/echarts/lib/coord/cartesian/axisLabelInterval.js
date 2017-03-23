define('node_modules/echarts/lib/coord/cartesian/axisLabelInterval', function(require, exports, module) {

  'use strict';
  /**
   * Helper function for axisLabelInterval calculation
   */
  
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var axisHelper = require('node_modules/echarts/lib/coord/axisHelper');
  
      module.exports = function (axis) {
          var axisModel = axis.model;
          var labelModel = axisModel.getModel('axisLabel');
          var labelInterval = labelModel.get('interval');
          if (!(axis.type === 'category' && labelInterval === 'auto')) {
              return labelInterval === 'auto' ? 0 : labelInterval;
          }
  
          return axisHelper.getAxisLabelInterval(
              zrUtil.map(axis.scale.getTicks(), axis.dataToCoord, axis),
              axisModel.getFormattedLabels(),
              labelModel.getModel('textStyle').getFont(),
              axis.isHorizontal()
          );
      };
  

});
