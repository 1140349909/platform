define('node_modules/echarts/lib/chart/graph/circularLayout', function(require, exports, module) {

  
      var circularLayoutHelper = require('node_modules/echarts/lib/chart/graph/circularLayoutHelper');
      module.exports = function (ecModel) {
          ecModel.eachSeriesByType('graph', function (seriesModel) {
              if (seriesModel.get('layout') === 'circular') {
                  circularLayoutHelper(seriesModel);
              }
          });
      };
  

});
