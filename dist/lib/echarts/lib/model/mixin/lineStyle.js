define('node_modules/echarts/lib/model/mixin/lineStyle', function(require, exports, module) {

  
      var getLineStyle = require('node_modules/echarts/lib/model/mixin/makeStyleMapper')(
          [
              ['lineWidth', 'width'],
              ['stroke', 'color'],
              ['opacity'],
              ['shadowBlur'],
              ['shadowOffsetX'],
              ['shadowOffsetY'],
              ['shadowColor']
          ]
      );
      module.exports = {
          getLineStyle: function (excludes) {
              var style = getLineStyle.call(this, excludes);
              var lineDash = this.getLineDash();
              lineDash && (style.lineDash = lineDash);
              return style;
          },
  
          getLineDash: function () {
              var lineType = this.get('type');
              return (lineType === 'solid' || lineType == null) ? null
                  : (lineType === 'dashed' ? [5, 5] : [2, 2]);
          }
      };
  

});
