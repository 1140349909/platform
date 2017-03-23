define('node_modules/echarts/lib/model/mixin/boxLayout', function(require, exports, module) {

  
  
      module.exports = {
          getBoxLayoutParams: function () {
              return {
                  left: this.get('left'),
                  top: this.get('top'),
                  right: this.get('right'),
                  bottom: this.get('bottom'),
                  width: this.get('width'),
                  height: this.get('height')
              };
          }
      };
  

});
