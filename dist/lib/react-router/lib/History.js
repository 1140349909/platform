define('node_modules/react-router/lib/History', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _routerWarning = require('node_modules/react-router/lib/routerWarning');
  
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  
  var _InternalPropTypes = require('node_modules/react-router/lib/InternalPropTypes');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * A mixin that adds the "history" instance variable to components.
   */
  var History = {
  
    contextTypes: {
      history: _InternalPropTypes.history
    },
  
    componentWillMount: function componentWillMount() {
      'development' !== 'production' ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
      this.history = this.context.history;
    }
  };
  
  exports.default = History;
  module.exports = exports['default'];

});
