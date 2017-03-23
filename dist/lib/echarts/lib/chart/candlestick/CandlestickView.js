define('node_modules/echarts/lib/chart/candlestick/CandlestickView', function(require, exports, module) {

  'use strict';
  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var ChartView = require('node_modules/echarts/lib/view/Chart');
      var graphic = require('node_modules/echarts/lib/util/graphic');
      var whiskerBoxCommon = require('node_modules/echarts/lib/chart/helper/whiskerBoxCommon');
  
      var CandlestickView = ChartView.extend({
  
          type: 'candlestick',
  
          getStyleUpdater: function () {
              return updateStyle;
          }
  
      });
  
      zrUtil.mixin(CandlestickView, whiskerBoxCommon.viewMixin, true);
  
      // Update common properties
      var normalStyleAccessPath = ['itemStyle', 'normal'];
      var emphasisStyleAccessPath = ['itemStyle', 'emphasis'];
  
      function updateStyle(itemGroup, data, idx) {
          var itemModel = data.getItemModel(idx);
          var normalItemStyleModel = itemModel.getModel(normalStyleAccessPath);
          var color = data.getItemVisual(idx, 'color');
          var borderColor = data.getItemVisual(idx, 'borderColor') || color;
  
          // Color must be excluded.
          // Because symbol provide setColor individually to set fill and stroke
          var itemStyle = normalItemStyleModel.getItemStyle(
              ['color', 'color0', 'borderColor', 'borderColor0']
          );
  
          var whiskerEl = itemGroup.childAt(itemGroup.whiskerIndex);
          whiskerEl.useStyle(itemStyle);
          whiskerEl.style.stroke = borderColor;
  
          var bodyEl = itemGroup.childAt(itemGroup.bodyIndex);
          bodyEl.useStyle(itemStyle);
          bodyEl.style.fill = color;
          bodyEl.style.stroke = borderColor;
  
          var hoverStyle = itemModel.getModel(emphasisStyleAccessPath).getItemStyle();
          graphic.setHoverStyle(itemGroup, hoverStyle);
      }
  
  
      module.exports = CandlestickView;
  
  

});
