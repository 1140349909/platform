define('node_modules/echarts/lib/component/visualMapPiecewise', function(require, exports, module) {

  /**
   * DataZoom component entry
   */
  
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(
          require('node_modules/echarts/lib/component/visualMap/preprocessor')
      );
  
      require('node_modules/echarts/lib/component/visualMap/typeDefaulter');
      require('node_modules/echarts/lib/component/visualMap/visualEncoding');
      require('node_modules/echarts/lib/component/visualMap/PiecewiseModel');
      require('node_modules/echarts/lib/component/visualMap/PiecewiseView');
      require('node_modules/echarts/lib/component/visualMap/visualMapAction');
  
  

});
