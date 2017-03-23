define('node_modules/echarts/lib/component/dataZoom/dataZoomAction', function(require, exports, module) {

  /**
   * @file Data zoom action
   */
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var helper = require('node_modules/echarts/lib/component/dataZoom/helper');
      var echarts = require('node_modules/echarts/lib/echarts');
  
  
      echarts.registerAction('dataZoom', function (payload, ecModel) {
  
          var linkedNodesFinder = helper.createLinkedNodesFinder(
              zrUtil.bind(ecModel.eachComponent, ecModel, 'dataZoom'),
              helper.eachAxisDim,
              function (model, dimNames) {
                  return model.get(dimNames.axisIndex);
              }
          );
  
          var effectedModels = [];
  
          ecModel.eachComponent(
              {mainType: 'dataZoom', query: payload},
              function (model, index) {
                  effectedModels.push.apply(
                      effectedModels, linkedNodesFinder(model).nodes
                  );
              }
          );
  
          zrUtil.each(effectedModels, function (dataZoomModel, index) {
              dataZoomModel.setRawRange({
                  start: payload.start,
                  end: payload.end,
                  startValue: payload.startValue,
                  endValue: payload.endValue
              });
          });
  
      });
  
  

});
