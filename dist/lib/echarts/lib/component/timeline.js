define('node_modules/echarts/lib/component/timeline', function(require, exports, module) {

  /**
   * DataZoom component entry
   */
  
  
      var echarts = require('node_modules/echarts/lib/echarts');
  
      echarts.registerPreprocessor(require('node_modules/echarts/lib/component/timeline/preprocessor'));
  
      require('node_modules/echarts/lib/component/timeline/typeDefaulter');
      require('node_modules/echarts/lib/component/timeline/timelineAction');
      require('node_modules/echarts/lib/component/timeline/SliderTimelineModel');
      require('node_modules/echarts/lib/component/timeline/SliderTimelineView');
  
  

});
