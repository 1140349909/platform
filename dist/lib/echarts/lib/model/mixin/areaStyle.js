define('node_modules/echarts/lib/model/mixin/areaStyle', function(require, exports, module) {

  
      module.exports = {
          getAreaStyle: require('node_modules/echarts/lib/model/mixin/makeStyleMapper')(
              [
                  ['fill', 'color'],
                  ['shadowBlur'],
                  ['shadowOffsetX'],
                  ['shadowOffsetY'],
                  ['opacity'],
                  ['shadowColor']
              ]
          )
      };
  

});
