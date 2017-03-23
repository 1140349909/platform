define('node_modules/history/lib/ExecutionEnvironment', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  exports.canUseDOM = canUseDOM;

});
