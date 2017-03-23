define('node_modules/history/lib/runTransitionHook', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _warning = require('node_modules/history/node_modules/warning/browser');
  
  var _warning2 = _interopRequireDefault(_warning);
  
  function runTransitionHook(hook, location, callback) {
    var result = hook(location, callback);
  
    if (hook.length < 2) {
      // Assume the hook runs synchronously and automatically
      // call the callback with the return value.
      callback(result);
    } else {
      'development' !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
    }
  }
  
  exports['default'] = runTransitionHook;
  module.exports = exports['default'];

});
