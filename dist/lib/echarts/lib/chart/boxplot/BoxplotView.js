define('node_modules/echarts/lib/chart/boxplot/BoxplotView', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var ChartView = require('node_modules/echarts/lib/view/Chart');
      var graphic = require('node_modules/echarts/lib/util/graphic');
      var whiskerBoxCommon = require('node_modules/echarts/lib/chart/helper/whiskerBoxCommon');
  
      var BoxplotView = ChartView.extend({
  
          type: 'boxplot',
  
          getStyleUpdater: function () {
              return updateStyle;
          }
      });
  
      zrUtil.mixin(BoxplotView, whiskerBoxCommon.viewMixin, true);
  
      // Update common properties
      var normalStyleAccessPath = ['itemStyle', 'normal'];
      var emphasisStyleAccessPath = ['itemStyle', 'emphasis'];
  
      function updateStyle(itemGroup, data, idx) {
          var itemModel = data.getItemModel(idx);
          var normalItemStyleModel = itemModel.getModel(normalStyleAccessPath);
          var borderColor = data.getItemVisual(idx, 'color');
  
          // Exclude borderColor.
          var itemStyle = normalItemStyleModel.getItemStyle(['borderColor']);
  
          var whiskerEl = itemGroup.childAt(itemGroup.whiskerIndex);
          whiskerEl.style.set(itemStyle);
          whiskerEl.style.stroke = borderColor;
          whiskerEl.dirty();
  
          var bodyEl = itemGroup.childAt(itemGroup.bodyIndex);
          bodyEl.style.set(itemStyle);
          bodyEl.style.stroke = borderColor;
          bodyEl.dirty();
  
          var hoverStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
          graphic.setHoverStyle(itemGroup, hoverStyle);
      }
  
      module.exports = BoxplotView;
  
  

});
