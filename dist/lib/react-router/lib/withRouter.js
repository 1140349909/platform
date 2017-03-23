define('node_modules/react-router/lib/withRouter', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  exports.default = withRouter;
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _hoistNonReactStatics = require('node_modules/hoist-non-react-statics/index');
  
  var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
  
  var _PropTypes = require('node_modules/react-router/lib/PropTypes');
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  
  function withRouter(WrappedComponent) {
    var WithRouter = _react2.default.createClass({
      displayName: 'WithRouter',
  
      contextTypes: { router: _PropTypes.routerShape },
      render: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, { router: this.context.router }));
      }
    });
  
    WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
    WithRouter.WrappedComponent = WrappedComponent;
  
    return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
  }
  module.exports = exports['default'];

});
