define('node_modules/echarts/lib/coord/polar/AngleAxis', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var Axis = require('node_modules/echarts/lib/coord/Axis');
  
      function AngleAxis(scale, angleExtent) {
  
          angleExtent = angleExtent || [0, 360];
  
          Axis.call(this, 'angle', scale, angleExtent);
  
          /**
           * Axis type
           *  - 'category'
           *  - 'value'
           *  - 'time'
           *  - 'log'
           * @type {string}
           */
          this.type = 'category';
      }
  
      AngleAxis.prototype = {
  
          constructor: AngleAxis,
  
          dataToAngle: Axis.prototype.dataToCoord,
  
          angleToData: Axis.prototype.coordToData
      };
  
      zrUtil.inherits(AngleAxis, Axis);
  
      module.exports = AngleAxis;
  

});
