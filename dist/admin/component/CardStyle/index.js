define('admin/component/CardStyle/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  var CardStyle = (function (_Component) {
      _inherits(CardStyle, _Component);
  
      function CardStyle(props) {
          _classCallCheck(this, CardStyle);
  
          _get(Object.getPrototypeOf(CardStyle.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(CardStyle, [{
          key: "render",
          value: function render() {
              var cardStyle = this.props.cardStyle;
  
              var bgColor = {};
  
              if (cardStyle.bgRadio == 'img') {
                  bgColor = {
                      style: {
                          backgroundImage: 'url(' + _commonUtilMedia2["default"].getMediaUrl(cardStyle.bgImg) + ')'
                      }
                  };
              } else {
                  bgColor = {
                      style: {
                          backgroundColor: cardStyle.bgColor
                      }
                  };
              }
  
              var fontColor = {
                  style: {
                      color: cardStyle.fontColor
                  }
              };
  
              return _react2["default"].createElement(
                  "div",
                  _extends({ className: "card-style" }, bgColor),
                  _react2["default"].createElement(
                      "div",
                      { className: "card-style-hd" },
                      _react2["default"].createElement(
                          "div",
                          { className: "card-style-hdimg" },
                          _react2["default"].createElement("img", { src: "/admin/component/CardStyle/img/page1.png" })
                      ),
                      _react2["default"].createElement(
                          "div",
                          _extends({ className: "card-style-name" }, fontColor),
                          "姓名"
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "card-style-ft" },
                      _react2["default"].createElement(
                          "div",
                          _extends({ className: "card-style-title" }, fontColor),
                          cardStyle.title
                      ),
                      _react2["default"].createElement(
                          "div",
                          _extends({ className: "card-style-number" }, fontColor),
                          "2089 1234 3213"
                      )
                  )
              );
          }
      }]);
  
      return CardStyle;
  })(_react.Component);
  
  exports["default"] = CardStyle;
  module.exports = exports["default"];

});
