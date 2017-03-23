define('node_modules/echarts/lib/chart/map', function(require, exports, module) {

  
  
      var echarts = require('node_modules/echarts/lib/echarts');
      var PRIORITY = echarts.PRIORITY;
  
      require('node_modules/echarts/lib/chart/map/MapSeries');
  
      require('node_modules/echarts/lib/chart/map/MapView');
  
      require('node_modules/echarts/lib/action/geoRoam');
  
      require('node_modules/echarts/lib/coord/geo/geoCreator');
  
      echarts.registerLayout(require('node_modules/echarts/lib/chart/map/mapSymbolLayout'));
  
      echarts.registerVisual(require('node_modules/echarts/lib/chart/map/mapVisual'));
  
      echarts.registerProcessor(PRIORITY.PROCESSOR.STATISTIC, require('node_modules/echarts/lib/chart/map/mapDataStatistic'));
  
      echarts.registerPreprocessor(require('node_modules/echarts/lib/chart/map/backwardCompat'));
  
      require('node_modules/echarts/lib/action/createDataSelectAction')('map', [{
          type: 'mapToggleSelect',
          event: 'mapselectchanged',
          method: 'toggleSelected'
      }, {
          type: 'mapSelect',
          event: 'mapselected',
          method: 'select'
      }, {
          type: 'mapUnSelect',
          event: 'mapunselected',
          method: 'unSelect'
      }]);
  

});
