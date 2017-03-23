define('node_modules/echarts/lib/chart/effectScatter/EffectScatterView', function(require, exports, module) {

  
  
      var SymbolDraw = require('node_modules/echarts/lib/chart/helper/SymbolDraw');
      var EffectSymbol = require('node_modules/echarts/lib/chart/helper/EffectSymbol');
  
      require('node_modules/echarts/lib/echarts').extendChartView({
  
          type: 'effectScatter',
  
          init: function () {
              this._symbolDraw = new SymbolDraw(EffectSymbol);
          },
  
          render: function (seriesModel, ecModel, api) {
              var data = seriesModel.getData();
              var effectSymbolDraw = this._symbolDraw;
              effectSymbolDraw.updateData(data);
              this.group.add(effectSymbolDraw.group);
          },
  
          updateLayout: function () {
              this._symbolDraw.updateLayout();
          },
  
          remove: function (ecModel, api) {
              this._symbolDraw && this._symbolDraw.remove(api);
          }
      });
  

});
