define('node_modules/echarts/lib/component/visualMap/visualMapAction', function(require, exports, module) {

  /**
   * @file Data range action
   */
  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      var actionInfo = {
          type: 'selectDataRange',
          event: 'dataRangeSelected',
          // FIXME use updateView appears wrong
          update: 'update'
      };
  
      echarts.registerAction(actionInfo, function (payload, ecModel) {
  
          ecModel.eachComponent({mainType: 'visualMap', query: payload}, function (model) {
              model.setSelected(payload.selected);
          });
  
      });
  
  

});
