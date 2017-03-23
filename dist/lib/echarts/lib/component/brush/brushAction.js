define('node_modules/echarts/lib/component/brush/brushAction', function(require, exports, module) {

  /**
   * @file Brush action
   */
  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      /**
       * payload: {
       *      brushIndex: number, or,
       *      brushId: string, or,
       *      brushName: string,
       *      globalRanges: Array
       * }
       */
      echarts.registerAction(
           {type: 'brush', event: 'brush', update: 'updateView'},
          function (payload, ecModel) {
              ecModel.eachComponent({mainType: 'brush', query: payload}, function (brushModel) {
                  brushModel.setAreas(payload.areas);
              });
          }
      );
  
      /**
       * payload: {
       *      brushComponents: [
       *          {
       *              brushId,
       *              brushIndex,
       *              brushName,
       *              series: [
       *                  {
       *                      seriesId,
       *                      seriesIndex,
       *                      seriesName,
       *                      rawIndices: [21, 34, ...]
       *                  },
       *                  ...
       *              ]
       *          },
       *          ...
       *      ]
       * }
       */
      echarts.registerAction(
           {type: 'brushSelect', event: 'brushSelected', update: 'none'},
          function () {}
      );
  

});
