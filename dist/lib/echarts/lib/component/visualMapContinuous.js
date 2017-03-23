define('node_modules/echarts/lib/component/visualMapContinuous', function(require, exports, module) {

  /**
   * DataZoom component entry
   */
  
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(
          require('node_modules/echarts/lib/component/visualMap/preprocessor')
      );
  
      require('node_modules/echarts/lib/component/visualMap/typeDefaulter');
      require('node_modules/echarts/lib/component/visualMap/visualEncoding');
      require('node_modules/echarts/lib/component/visualMap/ContinuousModel');
      require('node_modules/echarts/lib/component/visualMap/ContinuousView');
      require('node_modules/echarts/lib/component/visualMap/visualMapAction');
  
  

});
