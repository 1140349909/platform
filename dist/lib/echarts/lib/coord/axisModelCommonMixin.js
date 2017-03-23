define('node_modules/echarts/lib/coord/axisModelCommonMixin', function(require, exports, module) {

  
  
      var zrUtil = require('node_modules/zrender/lib/core/util');
      var axisHelper = require('node_modules/echarts/lib/coord/axisHelper');
  
      function getName(obj) {
          if (zrUtil.isObject(obj) && obj.value != null) {
              return obj.value;
          }
          else {
              return obj;
          }
      }
      /**
       * Get categories
       */
      function getCategories() {
          return this.get('type') === 'category'
              && zrUtil.map(this.get('data'), getName);
      }
  
      /**
       * Format labels
       * @return {Array.<string>}
       */
      function getFormattedLabels() {
          return axisHelper.getFormattedLabels(
              this.axis,
              this.get('axisLabel.formatter')
          );
      }
  
      module.exports = {
  
          getFormattedLabels: getFormattedLabels,
  
          getCategories: getCategories
      };
  

});
