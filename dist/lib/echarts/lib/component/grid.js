define('node_modules/echarts/lib/component/grid', function(require, exports, module) {

  'use strict';
  
  
      var graphic = require('node_modules/echarts/lib/util/graphic');
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/coord/cartesian/Grid');
  
      require('node_modules/echarts/lib/component/axis');
  
      // Grid view
      echarts.extendComponentView({
  
          type: 'grid',
  
          render: function (gridModel, ecModel) {
              this.group.removeAll();
              if (gridModel.get('show')) {
                  this.group.add(new graphic.Rect({
                      shape:gridModel.coordinateSystem.getRect(),
                      style: zrUtil.defaults({
                          fill: gridModel.get('backgroundColor')
                      }, gridModel.getItemStyle()),
                      silent: true
                  }));
              }
          }
      });
  
      echarts.registerPreprocessor(function (option) {
          // Only create grid when need
          if (option.xAxis && option.yAxis && !option.grid) {
              option.grid = {};
          }
      });
  

});
