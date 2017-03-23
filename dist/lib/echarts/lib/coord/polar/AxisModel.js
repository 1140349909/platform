define('node_modules/echarts/lib/coord/polar/AxisModel', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var ComponentModel = require('node_modules/echarts/lib/model/Component');
      var axisModelCreator = require('node_modules/echarts/lib/coord/axisModelCreator');
  
      var PolarAxisModel = ComponentModel.extend({
          type: 'polarAxis',
          /**
           * @type {module:echarts/coord/polar/AngleAxis|module:echarts/coord/polar/RadiusAxis}
           */
          axis: null
      });
  
      zrUtil.merge(PolarAxisModel.prototype, require('node_modules/echarts/lib/coord/axisModelCommonMixin'));
  
      var polarAxisDefaultExtendedOption = {
          angle: {
              // polarIndex: 0,
              // polarId: '',
  
              startAngle: 90,
  
              clockwise: true,
  
              splitNumber: 12,
  
              axisLabel: {
                  rotate: false
              }
          },
          radius: {
              // polarIndex: 0,
              // polarId: '',
  
              splitNumber: 5
          }
      };
  
      function getAxisType(axisDim, option) {
          // Default axis with data is category axis
          return option.type || (option.data ? 'category' : 'value');
      }
  
      axisModelCreator('angle', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.angle);
      axisModelCreator('radius', PolarAxisModel, getAxisType, polarAxisDefaultExtendedOption.radius);
  
  

});
