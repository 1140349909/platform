define('node_modules/echarts/lib/component/dataZoom/InsideZoomModel', function(require, exports, module) {

  /**
   * @file Data zoom model
   */
  
  
      module.exports = require('node_modules/echarts/lib/component/dataZoom/DataZoomModel').extend({
  
          type: 'dataZoom.inside',
  
          /**
           * @protected
           */
          defaultOption: {
              zoomLock: false // Whether disable zoom but only pan.
          }
      });
  

});
