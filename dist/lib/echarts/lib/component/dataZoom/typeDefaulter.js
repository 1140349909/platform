define('node_modules/echarts/lib/component/dataZoom/typeDefaulter', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/model/Component').registerSubTypeDefaulter('dataZoom', function (option) {
          // Default 'slider' when no type specified.
          return 'slider';
      });
  
  

});
