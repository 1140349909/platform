define('admin/view/content/index.jsx', function(require, exports, module) {

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
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _commonUtilUrlParser = require('common/util/urlParser');
  
  var _commonUtilUrlParser2 = _interopRequireDefault(_commonUtilUrlParser);
  
  '';
  
  var ContentIndex = (function (_Component) {
      _inherits(ContentIndex, _Component);
  
      function ContentIndex(props) {
          _classCallCheck(this, _ContentIndex);
  
          _get(Object.getPrototypeOf(_ContentIndex.prototype), "constructor", this).call(this, props);
          this.state = {
              type: 'list',
              url: ''
          };
      }
  
      _createClass(ContentIndex, [{
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              this.state.type = nextProps.params.type;
          }
      }, {
          key: "getUrl",
          value: function getUrl(type) {
              var path = '';
  
              switch (type) {
                  default:
                  case 'list':
                      path = '/content-bs.html#/list/all';
                      break;
                  case 'site':
                      path = '/content-bs.html#/site';
                      break;
              }
              if (path) {
                  return _commonUtilUrlParser2["default"].parseILokaUrl(path);
              } else {
                  return '';
              }
          }
      }, {
          key: "render",
          value: function render() {
              var url = this.getUrl(this.state.type);
  
              if (url) {
                  return _react2["default"].createElement(
                      "div",
                      { className: "iloka-page" },
                      _react2["default"].createElement("iframe", { src: url, width: "100%", height: "100%", frameBorder: "0" })
                  );
              } else {
                  return _react2["default"].createElement(
                      "div",
                      { className: "home-welcome" },
                      "欢迎来到灵肯管理平台!"
                  );
              }
          }
      }]);
  
      var _ContentIndex = ContentIndex;
      ContentIndex = (0, _reactRedux.connect)(function (state) {
          return {};
      })(ContentIndex) || ContentIndex;
      return ContentIndex;
  })(_react.Component);
  
  exports["default"] = ContentIndex;
  module.exports = exports["default"];

});
