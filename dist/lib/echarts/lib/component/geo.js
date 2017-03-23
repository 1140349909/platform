define('node_modules/echarts/lib/component/geo', function(require, exports, module) {

  
  
      require('node_modules/echarts/lib/coord/geo/GeoModel');
  
      require('node_modules/echarts/lib/coord/geo/geoCreator');
  
      require('node_modules/echarts/lib/component/geo/GeoView');
  
      require('node_modules/echarts/lib/action/geoRoam');
  
      var echarts = require('node_modules/echarts/lib/echarts');
      var zrUtil = require('node_modules/zrender/lib/core/util');
  
      function makeAction(method, actionInfo) {
          actionInfo.update = 'updateView';
          echarts.registerAction(actionInfo, function (payload, ecModel) {
              var selected = {};
  
              ecModel.eachComponent(
                  { mainType: 'geo', query: payload},
                  function (geoModel) {
                      geoModel[method](payload.name);
                      var geo = geoModel.coordinateSystem;
                      zrUtil.each(geo.regions, function (region) {
                          selected[region.name] = geoModel.isSelected(region.name) || false;
                      });
                  }
              );
  
              return {
                  selected: selected,
                  name: payload.name
              }
          });
      }
  
      makeAction('toggleSelected', {
          type: 'geoToggleSelect',
          event: 'geoselectchanged'
      });
      makeAction('select', {
          type: 'geoSelect',
          event: 'geoselected'
      });
      makeAction('unSelect', {
          type: 'geoUnSelect',
          event: 'geounselected'
      });
  

});
