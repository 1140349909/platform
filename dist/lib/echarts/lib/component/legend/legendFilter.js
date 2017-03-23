define('node_modules/echarts/lib/component/legend/legendFilter', function(require, exports, module) {

  
     module.exports = function (ecModel) {
          var legendModels = ecModel.findComponents({
              mainType: 'legend'
          });
          if (legendModels && legendModels.length) {
              ecModel.filterSeries(function (series) {
                  // If in any legend component the status is not selected.
                  // Because in legend series is assumed selected when it is not in the legend data.
                  for (var i = 0; i < legendModels.length; i++) {
                      if (!legendModels[i].isSelected(series.name)) {
                          return false;
                      }
                  }
                  return true;
              });
          }
      };
  

});
