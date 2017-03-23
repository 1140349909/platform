define('admin/component/TkerProductExtra/index.jsx', function(require, exports, module) {

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
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonUtil = require('common/util/index');
  
  '';
  
  // Card-select和新增按钮
  
  var TkerProductExtra = (function (_Component) {
      _inherits(TkerProductExtra, _Component);
  
      function TkerProductExtra() {
          _classCallCheck(this, TkerProductExtra);
  
          _get(Object.getPrototypeOf(TkerProductExtra.prototype), "constructor", this).apply(this, arguments);
      }
  
      _createClass(TkerProductExtra, [{
          key: "render",
          value: function render() {
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var costAmount = 0,
                  profitAmount = 0,
                  salesAmount = 0;
  
              if (data.opdata.tradeData !== null) {
                  costAmount = (0, _commonUtil.moneyFormat)(data.opdata.tradeData.costAmount, '￥');
                  profitAmount = (0, _commonUtil.moneyFormat)(data.opdata.tradeData.profitAmount, '￥');
                  salesAmount = (0, _commonUtil.moneyFormat)(data.opdata.tradeData.salesAmount, '￥');
              }
  
              return _react2["default"].createElement(
                  "div",
                  { className: "tker-product-extra" },
                  _react2["default"].createElement("img", { className: "tker-product-extra-img", src: data.mediaRes.productImgUrl }),
                  _react2["default"].createElement(
                      "div",
                      { className: "tker-product-extra-text" },
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              data.name
                          )
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              "商品编号："
                          ),
                          data.code
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              "成本单价："
                          ),
                          (0, _commonUtil.moneyFormat)(data.cost, '￥')
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "tker-product-extra-opdata" },
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              "商品成本："
                          ),
                          costAmount
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              "商品售价："
                          ),
                          salesAmount
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          _react2["default"].createElement(
                              "span",
                              { className: "tker-product-extra-em" },
                              "商品利润："
                          ),
                          profitAmount
                      )
                  )
              );
          }
      }]);
  
      return TkerProductExtra;
  })(_react.Component);
  
  exports["default"] = TkerProductExtra;
  module.exports = exports["default"];

});
