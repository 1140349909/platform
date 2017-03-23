define('node_modules/echarts/lib/component/brush', function(require, exports, module) {

  /**
   * Brush component entry
   */
  
  
      require('node_modules/echarts/lib/echarts').registerPreprocessor(
          require('node_modules/echarts/lib/component/brush/preprocessor')
      );
  
      require('node_modules/echarts/lib/component/brush/visualEncoding');
      require('node_modules/echarts/lib/component/brush/BrushModel');
      require('node_modules/echarts/lib/component/brush/BrushView');
      require('node_modules/echarts/lib/component/brush/brushAction');
  
      require('node_modules/echarts/lib/component/toolbox/feature/Brush');
  
  

});
