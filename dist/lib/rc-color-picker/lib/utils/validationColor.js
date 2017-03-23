define('node_modules/rc-color-picker/lib/utils/validationColor', function(require, exports, module) {

  'use strict';
  
  module.exports = function validationColor(props, propName, componentName) {
    if (props[propName] && !/^#[0-9a-fA-F]{3,6}$/.test(props[propName])) {
      return new Error(componentName + '.props.' + propName + ' Validation failed!');
    }
  };

});
