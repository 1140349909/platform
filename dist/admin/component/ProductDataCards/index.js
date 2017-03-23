define('admin/component/ProductDataCards/index.jsx', function(require, exports, module) {

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
  
  var _commonUtil = require('common/util/index');
  
  '';
  
  // 新增产品容器-父组件
  
  var ProductDataCards = (function (_Component) {
      _inherits(ProductDataCards, _Component);
  
      function ProductDataCards(props) {
          _classCallCheck(this, ProductDataCards);
  
          _get(Object.getPrototypeOf(ProductDataCards.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(ProductDataCards, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var saleTotal = this.props.saleTotal;
  
              if (!saleTotal) {
                  return null;
              }
  
              return _react2["default"].createElement(
                  "div",
                  { className: "product-datacards" },
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "商城在线商品数"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          saleTotal.productOpenings
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "今日交易总产品数"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          saleTotal.todayProductAmount
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "交易总产品数"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          saleTotal.productAmount
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "交易总金额/元"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          (0, _commonUtil.moneyFormat)(saleTotal.salesAmount)
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "交易总成本/元"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          (0, _commonUtil.moneyFormat)(saleTotal.costAmount)
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-tit" },
                          "交易总利润/元"
                      ),
                      _react2["default"].createElement(
                          "p",
                          { className: "product-datacards-item-number" },
                          (0, _commonUtil.moneyFormat)(saleTotal.profitAmount)
                      )
                  ),
                  _react2["default"].createElement(
                      _antd.Card,
                      { className: "product-datacards-item" },
                      _react2["default"].createElement(
                          "a",
                          { className: "product-datacards-item-add", onClick: function () {
                                  _this.props.locationAdd();
                              } },
                          " + 新增商品"
                      )
                  )
              );
          }
      }]);
  
      return ProductDataCards;
  })(_react.Component);
  
  exports["default"] = ProductDataCards;
  module.exports = exports["default"];

});
