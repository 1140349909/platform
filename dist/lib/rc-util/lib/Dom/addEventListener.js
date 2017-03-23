define('node_modules/rc-util/lib/Dom/addEventListener', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = addEventListenerWrap;
  
  var _addDomEventListener = require('node_modules/add-dom-event-listener/lib/index');
  
  var _addDomEventListener2 = _interopRequireDefault(_addDomEventListener);
  
  var _reactDom = require('node_modules/react-dom/index');
  
  var _reactDom2 = _interopRequireDefault(_reactDom);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function addEventListenerWrap(target, eventType, cb) {
    /* eslint camelcase: 2 */
    var callback = _reactDom2["default"].unstable_batchedUpdates ? function run(e) {
      _reactDom2["default"].unstable_batchedUpdates(cb, e);
    } : cb;
    return (0, _addDomEventListener2["default"])(target, eventType, callback);
  }
  module.exports = exports['default'];

});
