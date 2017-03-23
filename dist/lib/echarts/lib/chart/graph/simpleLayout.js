define('node_modules/echarts/lib/chart/graph/simpleLayout', function(require, exports, module) {

  
  
      var simpleLayoutHelper = require('node_modules/echarts/lib/chart/graph/simpleLayoutHelper');
      var simpleLayoutEdge = require('node_modules/echarts/lib/chart/graph/simpleLayoutEdge');
      module.exports = function (ecModel, api) {
          ecModel.eachSeriesByType('graph', function (seriesModel) {
              var layout = seriesModel.get('layout');
              var coordSys = seriesModel.coordinateSystem;
              if (coordSys && coordSys.type !== 'view') {
                  var data = seriesModel.getData();
                  data.each(coordSys.dimensions, function (x, y, idx) {
                      if (!isNaN(x) && !isNaN(y)) {
                          data.setItemLayout(idx, coordSys.dataToPoint([x, y]));
                      }
                      else {
                          // Also {Array.<number>}, not undefined to avoid if...else... statement
                          data.setItemLayout(idx, [NaN, NaN]);
                      }
                  });
  
                  simpleLayoutEdge(data.graph);
              }
              else if (!layout || layout === 'none') {
                  simpleLayoutHelper(seriesModel);
              }
          });
      };
  

});
