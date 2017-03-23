define('node_modules/echarts/lib/chart/bar/barItemStyle', function(require, exports, module) {

  
  
  
      var getBarItemStyle = require('node_modules/echarts/lib/model/mixin/makeStyleMapper')(
          [
              ['fill', 'color'],
              ['stroke', 'borderColor'],
              ['lineWidth', 'borderWidth'],
              // Compatitable with 2
              ['stroke', 'barBorderColor'],
              ['lineWidth', 'barBorderWidth'],
              ['opacity'],
              ['shadowBlur'],
              ['shadowOffsetX'],
              ['shadowOffsetY'],
              ['shadowColor']
          ]
      );
      module.exports = {
          getBarItemStyle: function (excludes) {
              var style = getBarItemStyle.call(this, excludes);
              if (this.getBorderLineDash) {
                  var lineDash = this.getBorderLineDash();
                  lineDash && (style.lineDash = lineDash);
              }
              return style;
          }
      };
  

});
