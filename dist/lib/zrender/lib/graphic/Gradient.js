define('node_modules/zrender/lib/graphic/Gradient', function(require, exports, module) {

  
  
      /**
       * @param {Array.<Object>} colorStops
       */
      var Gradient = function (colorStops) {
  
          this.colorStops = colorStops || [];
      };
  
      Gradient.prototype = {
  
          constructor: Gradient,
  
          addColorStop: function (offset, color) {
              this.colorStops.push({
  
                  offset: offset,
  
                  color: color
              });
          }
      };
  
      module.exports = Gradient;
  

});
