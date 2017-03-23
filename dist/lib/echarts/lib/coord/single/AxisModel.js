define('node_modules/echarts/lib/coord/single/AxisModel', function(require, exports, module) {

  
  
      var ComponentModel = require('node_modules/echarts/lib/model/Component');
      var axisModelCreator = require('node_modules/echarts/lib/coord/axisModelCreator');
      var zrUtil =  require('node_modules/zrender/lib/core/util');
  
      var AxisModel = ComponentModel.extend({
  
          type: 'singleAxis',
  
          layoutMode: 'box',
  
          /**
           * @type {module:echarts/coord/single/SingleAxis}
           */
          axis: null,
  
          /**
           * @type {module:echarts/coord/single/Single}
           */
          coordinateSystem: null
  
      });
  
      var defaultOption = {
  
          left: '5%',
          top: '5%',
          right: '5%',
          bottom: '5%',
  
          type: 'value',
  
          position: 'bottom',
  
          orient: 'horizontal',
  
          axisLine: {
              show: true,
              lineStyle: {
                  width: 2,
                  type: 'solid'
              }
          },
  
          axisTick: {
              show: true,
              length: 6,
              lineStyle: {
                  width: 2
              }
          },
  
          axisLabel: {
              show: true,
              interval: 'auto'
          },
  
          splitLine: {
              show: true,
              lineStyle: {
                  type: 'dashed',
                  opacity: 0.2
              }
          }
      };
  
      function getAxisType(axisName, option) {
          return option.type || (option.data ? 'category' : 'value');
      }
  
      zrUtil.merge(AxisModel.prototype, require('node_modules/echarts/lib/coord/axisModelCommonMixin'));
  
      axisModelCreator('single', AxisModel, getAxisType, defaultOption);
  
      module.exports = AxisModel;
  

});
