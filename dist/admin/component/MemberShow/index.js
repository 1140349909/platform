define('admin/component/MemberShow/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var Option = _antd.Select.Option;
  
  var MemberShow = (function (_Component) {
      _inherits(MemberShow, _Component);
  
      function MemberShow(props) {
          var _this = this;
  
          _classCallCheck(this, MemberShow);
  
          _get(Object.getPrototypeOf(MemberShow.prototype), "constructor", this).call(this, props);
          this.state = {
              payType: '',
              tradeStatus: ''
          };
  
          this.handleChange = function (pagination) {
              _this.props.list(_this.props.id, _this.state.payType, _this.state.tradeStatus);
          };
  
          this.onChange = function (value, attr) {
  
              var data = {};
              data[attr] = value;
  
              _this.setState({
                  payType: data.payType != undefined ? data.payType : _this.state.payType,
                  tradeStatus: data.tradeStatus != undefined ? data.tradeStatus : _this.state.tradeStatus
              }, function () {
                  return _this.props.list(_this.props.id, _this.state.payType, _this.state.tradeStatus);
              });
          };
      }
  
      _createClass(MemberShow, [{
          key: "getColumns",
          value: function getColumns() {
  
              var filters = [{
                  text: '微信',
                  value: 'wechat'
              }, {
                  text: '支付宝',
                  value: 'alipay'
              }, {
                  text: '余额',
                  value: 'balance'
              }];
  
              var tradeFilters = [{
                  text: '未支付',
                  value: 'topay'
              }, {
                  text: '待发货',
                  value: 'todelivery'
              }, {
                  text: '待收货',
                  value: 'shipped'
              }, {
                  text: '已收货',
                  value: 'received'
              }];
  
              var drawFilters = [{
                  text: '等待开奖',
                  value: 'todraw'
              }, {
                  text: '未中奖',
                  value: 'noluck'
              }, {
                  text: '等待领奖',
                  value: 'toaccept'
              }];
  
              var columns = [{
                  title: '时间',
                  dataIndex: 'lastModifiedDate',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.lastModifiedDate), "yyyy-MM-dd hh:mm:ss S")
                      );
                  }
              }, {
                  title: '模块',
                  dataIndex: 'buyType',
                  render: function render(text, record, index) {
  
                      var buyType = '';
  
                      switch (record.buyType) {
                          case 'mall':
                              buyType = '商城';
                              break;
                          case 'yyg':
                              buyType = '一元购';
                              break;
  
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          buyType
                      );
                  }
              }, {
                  title: '参与商品',
                  dataIndex: 'productName'
  
              }, {
                  title: '交易价格/元',
                  dataIndex: 'price',
                  render: function render(text, record) {
  
                      var price = '';
  
                      switch (record.buyType) {
                          case 'mall':
                              price = (record.mall.price / 100).toFixed(2);
                              break;
                          case 'yyg':
                              price = record.yyg.credit + '枚幸运币';
                              break;
  
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          price
                      );
                  }
  
              }, {
                  title: '支付方式',
                  dataIndex: 'payType',
                  render: function render(text, record) {
  
                      var payType = '',
                          payTypeText = '';
  
                      switch (record.buyType) {
                          case 'mall':
                              payType = record.mall.payType;
                              break;
                          case 'yyg':
                              payType = record.yyg.payType;
                              break;
  
                      }
  
                      filters.map(function (item) {
                          if (item.value == payType) {
                              payTypeText = item.text;
                          }
                      });
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          payTypeText
                      );
                  }
              }, {
                  title: '支付金额/元',
                  dataIndex: 'totalMoney',
                  render: function render(text, record) {
  
                      var totalMoney = '';
  
                      switch (record.buyType) {
                          case 'mall':
                              totalMoney = record.totalMoney;
                              break;
                          case 'yyg':
                              totalMoney = record.yyg.credit * record.cost;
                              break;
  
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (totalMoney / 100).toFixed(2)
                      );
                  }
              }, {
                  title: '交易状态',
                  dataIndex: 'status',
                  render: function render(text, record) {
  
                      var tradeStatus = '';
  
                      switch (record.buyType) {
                          case 'mall':
                              tradeFilters.map(function (item) {
                                  if (item.value == record.tradeStatus) {
                                      tradeStatus = item.text;
                                  }
                              });
  
                              break;
                          case 'yyg':
                              drawFilters.map(function (item) {
                                  if (item.value == record.drawStatus) {
                                      tradeStatus = item.text;
                                  }
                              });
  
                              break;
  
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          tradeStatus
                      );
                  }
              }];
              return columns;
          }
      }, {
          key: "getPagination",
          value: function getPagination() {
              var _props$data = this.props.data;
              var totalElements = _props$data.totalElements;
              var size = _props$data.size;
  
              return {
                  total: totalElements,
                  pageSize: size,
                  showSizeChanger: true,
                  showTotal: function showTotal(total) {
                      return "共 " + total + " 个订单";
                  }
              };
          }
      }, {
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var columns = this.getColumns();
  
              var pagination = this.getPagination();
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: "订单明细",
                          width: 960,
                          visible: this.props.visible,
                          onOk: this.props.reset,
                          onCancel: this.props.reset },
                      _react2["default"].createElement(
                          "div",
                          { style: { 'height': '50px' } },
                          _react2["default"].createElement(
                              _antd.Select,
                              { placeholder: "请选择支付方式",
                                  onChange: function (value) {
                                      return _this2.onChange(value, 'payType');
                                  },
                                  style: { width: 120, 'margin': '5px' } },
                              _react2["default"].createElement(
                                  Option,
                                  { value: "" },
                                  "全部"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "wechat" },
                                  "微信"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "alipay" },
                                  "支付宝"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "balance" },
                                  "余额"
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Select,
                              { placeholder: "请选择交易状态",
                                  onChange: function (value) {
                                      return _this2.onChange(value, 'tradeStatus');
                                  },
                                  style: { width: 120, 'margin': '5px' } },
                              _react2["default"].createElement(
                                  Option,
                                  { value: "" },
                                  "全部"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "topay" },
                                  "未支付"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "todelivery" },
                                  "待发货"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "shipped" },
                                  "待收货"
                              ),
                              _react2["default"].createElement(
                                  Option,
                                  { value: "received" },
                                  "已收货"
                              )
                          )
                      ),
                      _react2["default"].createElement(_antd.Table, {
                          rowKey: "id",
                          columns: columns,
                          dataSource: data.content,
                          pagination: pagination,
                          bordered: true,
                          onChange: this.handleChange })
                  )
              );
          }
      }]);
  
      return MemberShow;
  })(_react.Component);
  
  exports["default"] = MemberShow;
  module.exports = exports["default"];

});
