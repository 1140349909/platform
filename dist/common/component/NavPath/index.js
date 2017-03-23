define('common/component/NavPath/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  '';
  
  var defaultProps = {
      navpath: []
  };
  
  var propTypes = {
      navpath: _react.PropTypes.array
  };
  
  var NavPath = (function (_React$Component) {
      _inherits(NavPath, _React$Component);
  
      function NavPath(props) {
          _classCallCheck(this, NavPath);
  
          _get(Object.getPrototypeOf(NavPath.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(NavPath, [{
          key: "render",
          value: function render() {
              var navpath = this.props.navpath;
  
              var bread = navpath.map(function (item) {
                  return _react2["default"].createElement(
                      _antd.Breadcrumb.Item,
                      { key: 'bc-' + item.key },
                      item.name
                  );
              });
              return _react2["default"].createElement(
                  "div",
                  { className: "ant-layout-breadcrumb" },
                  _react2["default"].createElement(
                      _antd.Breadcrumb,
                      null,
                      _react2["default"].createElement(
                          _antd.Breadcrumb.Item,
                          { key: "bc-0" },
                          "首页"
                      ),
                      bread
                  )
              );
          }
      }]);
  
      return NavPath;
  })(_react2["default"].Component);
  
  NavPath.propTypes = propTypes;
  NavPath.defaultProps = defaultProps;
  
  function mapStateToProps(state) {
  
      return {
          navpath: state.menu.navpath
      };
  }
  
  exports["default"] = (0, _reactRedux.connect)(mapStateToProps)(NavPath);
  module.exports = exports["default"];

});
