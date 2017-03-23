define('node_modules/echarts/lib/chart/candlestick', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      require('node_modules/echarts/lib/chart/candlestick/CandlestickSeries');
      require('node_modules/echarts/lib/chart/candlestick/CandlestickView');
  
      echarts.registerPreprocessor(
          require('node_modules/echarts/lib/chart/candlestick/preprocessor')
      );
  
      echarts.registerVisual(require('node_modules/echarts/lib/chart/candlestick/candlestickVisual'));
      echarts.registerLayout(require('node_modules/echarts/lib/chart/candlestick/candlestickLayout'));
  
  

});
