define('node_modules/echarts/lib/coord/radar/IndicatorAxis', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var Axis = require('node_modules/echarts/lib/coord/Axis');
  
      function IndicatorAxis(dim, scale, radiusExtent) {
          Axis.call(this, dim, scale, radiusExtent);
  
          /**
           * Axis type
           *  - 'category'
           *  - 'value'
           *  - 'time'
           *  - 'log'
           * @type {string}
           */
          this.type = 'value';
  
          this.angle = 0;
  
          /**
           * Indicator name
           * @type {string}
           */
          this.name = '';
          /**
           * @type {module:echarts/model/Model}
           */
          this.model;
      }
  
      zrUtil.inherits(IndicatorAxis, Axis);
  
      module.exports = IndicatorAxis;
  

});
