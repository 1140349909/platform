define('node_modules/zrender/lib/graphic/shape/Polygon', function(require, exports, module) {

  /**
   * 多边形
   * @module zrender/shape/Polygon
   */
  
  
      var polyHelper = require('node_modules/zrender/lib/graphic/helper/poly');
  
      module.exports = require('node_modules/zrender/lib/graphic/Path').extend({
          
          type: 'polygon',
  
          shape: {
              points: null,
  
              smooth: false,
  
              smoothConstraint: null
          },
  
          buildPath: function (ctx, shape) {
              polyHelper.buildPath(ctx, shape, true);
          }
      });
  

});
