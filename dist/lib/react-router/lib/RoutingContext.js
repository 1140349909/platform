define('node_modules/react-router/lib/RoutingContext', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _RouterContext = require('node_modules/react-router/lib/RouterContext');
  
  var _RouterContext2 = _interopRequireDefault(_RouterContext);
  
  var _routerWarning = require('node_modules/react-router/lib/routerWarning');
  
  var _routerWarning2 = _interopRequireDefault(_routerWarning);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var RoutingContext = _react2.default.createClass({
    displayName: 'RoutingContext',
    componentWillMount: function componentWillMount() {
      'development' !== 'production' ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
    },
    render: function render() {
      return _react2.default.createElement(_RouterContext2.default, this.props);
    }
  });
  
  exports.default = RoutingContext;
  module.exports = exports['default'];

});
