define('node_modules/echarts/lib/chart/heatmap/HeatmapSeries', function(require, exports, module) {

  
  
      var SeriesModel = require('node_modules/echarts/lib/model/Series');
      var createListFromArray = require('node_modules/echarts/lib/chart/helper/createListFromArray');
  
      module.exports = SeriesModel.extend({
          type: 'series.heatmap',
  
          getInitialData: function (option, ecModel) {
              return createListFromArray(option.data, this, ecModel);
          },
  
          defaultOption: {
  
              // Cartesian2D or geo
              coordinateSystem: 'cartesian2d',
  
              zlevel: 0,
  
              z: 2,
  
              // Cartesian coordinate system
              // xAxisIndex: 0,
              // yAxisIndex: 0,
  
              // Geo coordinate system
              geoIndex: 0,
  
              blurSize: 30,
  
              pointSize: 20,
  
              maxOpacity: 1,
  
              minOpacity: 0
          }
      });
  

});
