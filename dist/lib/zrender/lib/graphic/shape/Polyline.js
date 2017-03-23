define('node_modules/zrender/lib/graphic/shape/Polyline', function(require, exports, module) {

  /**
   * @module zrender/graphic/shape/Polyline
   */
  
  
      var polyHelper = require('node_modules/zrender/lib/graphic/helper/poly');
  
      module.exports = require('node_modules/zrender/lib/graphic/Path').extend({
          
          type: 'polyline',
  
          shape: {
              points: null,
  
              smooth: false,
  
              smoothConstraint: null
          },
  
          style: {
              stroke: '#000',
  
              fill: null
          },
  
          buildPath: function (ctx, shape) {
              polyHelper.buildPath(ctx, shape, false);
          }
      });
  

});
