define('node_modules/echarts/lib/component/timeline/typeDefaulter', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/model/Component').registerSubTypeDefaulter('timeline', function () {
          // Only slider now.
          return 'slider';
      });
  
  

});
