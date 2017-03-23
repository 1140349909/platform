define('node_modules/echarts/lib/coord/polar/RadiusAxis', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var Axis = require('node_modules/echarts/lib/coord/Axis');
  
      function RadiusAxis(scale, radiusExtent) {
  
          Axis.call(this, 'radius', scale, radiusExtent);
  
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
  
      RadiusAxis.prototype = {
  
          constructor: RadiusAxis,
  
          dataToRadius: Axis.prototype.dataToCoord,
  
          radiusToData: Axis.prototype.coordToData
      };
  
      zrUtil.inherits(RadiusAxis, Axis);
  
      module.exports = RadiusAxis;
  

});
