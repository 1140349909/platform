define('admin/component/TradeCard/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  '';
  
  /*封装卡片类*/
  
  var TradeCards = (function (_Component) {
      _inherits(TradeCards, _Component);
  
      function TradeCards() {
          var _this = this;
  
          _classCallCheck(this, TradeCards);
  
          _get(Object.getPrototypeOf(TradeCards.prototype), "constructor", this).apply(this, arguments);
  
          this.render = function () {
              var _props = _this.props;
              var data = _props.data;
              var type = _props.type;
  
              if (!data) {
                  return null;
              }
  
              return _react2["default"].createElement(
                  "div",
                  { style: { backgroound: '#ececec' } },
                  type == 'mall' && _react2["default"].createElement(
                      "div",
                      null,
                      _react2["default"].createElement(
                          _antd.Row,
                          { gutter: 16 },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 8 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总销售额："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.salesAmount ? data.salesAmount / 100 : 0,
                                      "元"
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总商品数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.productAmount ? data.productAmount : 0,
                                      "件"
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 8 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总利润："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.profitAmount ? data.profitAmount / 100 : 0,
                                      "元"
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总成本："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.costAmount ? data.costAmount / 100 : 0,
                                      "元"
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 8 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "上架商品数： "
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.productOpenings ? data.productOpenings : 0,
                                      "件"
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "今日商品数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      data.todayProductAmount ? data.todayProductAmount : 0,
                                      "件"
                                  )
                              )
                          )
                      )
                  ),
                  type == 'yyg' && _react2["default"].createElement(
                      "div",
                      null,
                      _react2["default"].createElement(
                          _antd.Row,
                          { gutter: 16 },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 4 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总销售额："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.salesAmount ? data.salesAmount / 100 : 0,
                                          "元"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总商品数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.productAmount ? data.productAmount : 0,
                                          "件"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 4 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总利润："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.profitAmount ? data.profitAmount / 100 : 0,
                                          "元"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总成本："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.costAmount ? data.costAmount / 100 : 0,
                                          "元"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 4 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "上架商品数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.productOpenings ? data.productOpenings : 0,
                                          "件"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "今日开奖商品数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.todayProductAmount ? data.todayProductAmount : 0,
                                          "件"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 4 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总参与人数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.peoples ? data.peoples : 0,
                                          "人"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总参与次数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.orders ? data.orders : 0,
                                          "次"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 4 },
                              _react2["default"].createElement(
                                  _antd.Card,
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总信用币数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.creditAmount,
                                          "枚"
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "总中奖人数："
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "trade-card-number" },
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          data.amount,
                                          "人"
                                      )
                                  )
                              )
                          )
                      )
                  )
              );
          };
      }
  
      return TradeCards;
  })(_react.Component);
  
  exports["default"] = TradeCards;
  module.exports = exports["default"];

});
