define('node_modules/zrender/lib/graphic/LinearGradient', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      var Gradient = require('node_modules/zrender/lib/graphic/Gradient');
  
      /**
       * x, y, x2, y2 are all percent from 0 to 1
       * @param {number} [x=0]
       * @param {number} [y=0]
       * @param {number} [x2=1]
       * @param {number} [y2=0]
       * @param {Array.<Object>} colorStops
       * @param {boolean} [globalCoord=false]
       */
      var LinearGradient = function (x, y, x2, y2, colorStops, globalCoord) {
          this.x = x == null ? 0 : x;
  
          this.y = y == null ? 0 : y;
  
          this.x2 = x2 == null ? 1 : x2;
  
          this.y2 = y2 == null ? 0 : y2;
  
          // Can be cloned
          this.type = 'linear';
  
          // If use global coord
          this.global = globalCoord || false;
  
          Gradient.call(this, colorStops);
      };
  
      LinearGradient.prototype = {
  
          constructor: LinearGradient
      };
  
      zrUtil.inherits(LinearGradient, Gradient);
  
      module.exports = LinearGradient;
  

});
