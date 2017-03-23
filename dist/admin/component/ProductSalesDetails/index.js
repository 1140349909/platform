define('admin/component/ProductSalesDetails/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  '';
  
  var _commonUtil = require('common/util/index');
  
  var RangePicker = _antd.DatePicker.RangePicker;
  
  // 在售商品
  
  var ProductSalesDetails = (function (_Component) {
      _inherits(ProductSalesDetails, _Component);
  
      function ProductSalesDetails(props) {
          _classCallCheck(this, ProductSalesDetails);
  
          _get(Object.getPrototypeOf(ProductSalesDetails.prototype), 'constructor', this).call(this, props);
      }
  
      // 数据控制模块
  
      _createClass(ProductSalesDetails, [{
          key: 'render',
          value: function render() {
  
              var data = this.props.data;
  
              // 判断属性不存在给于null值
              var mallDataList = typeof data.mall !== 'undefined' ? data.mall : null;
              var yygDataList = typeof data.yyg !== 'undefined' ? data.yyg : null;
              var total = typeof data.total !== 'undefined' ? data.total : null;
  
              var loading = this.props.loading;
              var extra = this.props.extra ? this.props.extra : '销售详情';
  
              return _react2['default'].createElement(
                  _antd.Modal,
                  {
                      visible: this.props.visible,
                      className: 'modal-top',
                      width: 900,
                      title: extra,
                      footer: _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: this.props.onCancel },
                          '返回'
                      ),
                      onCancel: this.props.onCancel },
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details' },
                      _react2['default'].createElement(ProductSalesDetailsControl, {
                          onOk: this.props.onOk,
                          onDatePicker: this.props.onDatePicker }),
                      _react2['default'].createElement(
                          'div',
                          null,
                          _react2['default'].createElement(ProductSalesDetailsMallTable, {
                              loading: loading,
                              data: mallDataList }),
                          _react2['default'].createElement(ProductSalesDetailsYygTable, {
                              loading: loading,
                              data: yygDataList }),
                          _react2['default'].createElement(ProductSalesDetailsTotal, {
                              loading: loading,
                              data: total })
                      )
                  )
              );
          }
      }]);
  
      return ProductSalesDetails;
  })(_react.Component);
  
  exports['default'] = ProductSalesDetails;
  
  var ProductSalesDetailsControl = (function (_Component2) {
      _inherits(ProductSalesDetailsControl, _Component2);
  
      function ProductSalesDetailsControl() {
          var _this = this;
  
          _classCallCheck(this, ProductSalesDetailsControl);
  
          _get(Object.getPrototypeOf(ProductSalesDetailsControl.prototype), 'constructor', this).apply(this, arguments);
  
          this.onOk = function (type) {
              if (_this.props.onOk) {
                  _this.props.onOk(type);
              }
          };
  
          this.onDatePicker = function (value, dateString) {
              if (_this.props.onDatePicker) {
                  _this.props.onDatePicker(dateString[0], dateString[1]);
              }
          };
      }
  
      // 商城销售详情
  
      _createClass(ProductSalesDetailsControl, [{
          key: 'render',
          value: function render() {
              var _this2 = this;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-sales-details-control' },
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details-l' },
                      _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: function () {
                                  return _this2.onOk('');
                              } },
                          '全部'
                      ),
                      _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: function () {
                                  return _this2.onOk('today');
                              } },
                          '今日'
                      ),
                      _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: function () {
                                  return _this2.onOk('yesterday');
                              } },
                          '昨天'
                      ),
                      _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: function () {
                                  return _this2.onOk('last7days');
                              } },
                          '近7天'
                      ),
                      _react2['default'].createElement(
                          _antd.Button,
                          {
                              size: 'large',
                              onClick: function () {
                                  return _this2.onOk('last30days');
                              } },
                          '近30天'
                      )
                  ),
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details-r' },
                      _react2['default'].createElement(RangePicker, { style: { width: 184 }, onChange: this.onDatePicker })
                  )
              );
          }
      }]);
  
      return ProductSalesDetailsControl;
  })(_react.Component);
  
  var ProductSalesDetailsMallTable = (function (_Component3) {
      _inherits(ProductSalesDetailsMallTable, _Component3);
  
      function ProductSalesDetailsMallTable() {
          _classCallCheck(this, ProductSalesDetailsMallTable);
  
          _get(Object.getPrototypeOf(ProductSalesDetailsMallTable.prototype), 'constructor', this).apply(this, arguments);
  
          this.getColumns = function () {
              return [{
                  title: '交易方式',
                  dataIndex: 'tradeTypes',
                  render: function render(text, record) {
                      switch (text) {
                          case 'integralcash':
                              return '现金 + 积分';
                              break;
                          case 'cash':
                              return '现金支付';
                              break;
                          case 'integral':
                              return '积分支付';
                              break;
                      }
                  }
              }, {
                  title: '现金定价',
                  dataIndex: 'price',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '积分定价',
                  dataIndex: 'integral',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text);
                  }
  
              }, {
                  title: '成本/元',
                  dataIndex: 'cost',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '销售数量',
                  dataIndex: 'amount',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '总积分抵现/元',
                  dataIndex: 'offsetAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '总优惠券/元',
                  dataIndex: 'couponAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '总售价',
                  dataIndex: 'salesAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '总实收',
                  dataIndex: 'totalpaid',
                  render: function render(text, record) {
                      if (record.tradeTypes == 'cash') {
                          return (0, _commonUtil.moneyFormat)(record.salesAmount - record.couponAmount - record.offsetAmount);
                      } else {
                          return '-';
                      }
                  }
              }, {
                  title: '总成本',
                  dataIndex: 'costAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '总盈利金额',
                  dataIndex: 'profitAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }];
          };
      }
  
      // 一元购销售详情
  
      _createClass(ProductSalesDetailsMallTable, [{
          key: 'render',
          value: function render() {
  
              var columns = this.getColumns();
              var data = this.props.data;
  
              var amount = '-',
                  salesAmount = '-',
                  profitAmount = '-',
                  list = [],
                  paid = 0;
  
              if (data !== null) {
                  amount = data.total.amount;
                  salesAmount = data.total.salesAmount;
                  profitAmount = data.total.profitAmount;
                  list = data.details;
                  list.map(function (item) {
                      paid = item.couponAmount + item.offsetAmount;
                  });
              }
              // 交易时间
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details-tit' },
                      _react2['default'].createElement(
                          _antd.Row,
                          null,
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 4 },
                              '商城销售详情'
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 5 },
                              '销售总量：',
                              amount
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 5 },
                              '销售总额/元：',
                              (0, _commonUtil.moneyFormat)(salesAmount)
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 5 },
                              '总实收/元：',
                              (0, _commonUtil.moneyFormat)(salesAmount - paid)
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 5 },
                              '盈利总金额/元：',
                              (0, _commonUtil.moneyFormat)(profitAmount)
                          )
                      )
                  ),
                  _react2['default'].createElement(_antd.Table, {
                      className: 'product-sales-details-table',
                      rowKey: function (record, index) {
                          return index;
                      },
                      columns: columns,
                      dataSource: list,
                      pagination: false,
                      bordered: true,
                      loading: this.props.loading })
              );
          }
      }]);
  
      return ProductSalesDetailsMallTable;
  })(_react.Component);
  
  var ProductSalesDetailsYygTable = (function (_Component4) {
      _inherits(ProductSalesDetailsYygTable, _Component4);
  
      function ProductSalesDetailsYygTable() {
          _classCallCheck(this, ProductSalesDetailsYygTable);
  
          _get(Object.getPrototypeOf(ProductSalesDetailsYygTable.prototype), 'constructor', this).apply(this, arguments);
  
          this.getColumns = function () {
              return [{
                  title: '每期需总币数',
                  dataIndex: 'credit',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '每次参与币数',
                  dataIndex: 'bidStep',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
  
              }, {
                  title: '每期开奖个数',
                  dataIndex: 'numOfOwners',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
  
              }, {
                  title: '成本/元',
                  dataIndex: 'cost',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '开奖期数',
                  dataIndex: 'total',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '开奖次数',
                  dataIndex: 'amount',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '交易金额/元',
                  dataIndex: 'salesAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }, {
                  title: '盈利金额/元',
                  dataIndex: 'profitAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.moneyFormat)(text);
                  }
              }];
          };
      }
  
      // 总销售
  
      _createClass(ProductSalesDetailsYygTable, [{
          key: 'render',
          value: function render() {
  
              var columns = this.getColumns();
              var data = this.props.data;
  
              var amount = '-',
                  salesAmount = '-',
                  profitAmount = '-',
                  list = [];
  
              if (data !== null) {
                  amount = data.total.amount;
                  salesAmount = data.total.salesAmount;
                  profitAmount = data.total.profitAmount;
                  list = data.details;
              }
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details-tit' },
                      _react2['default'].createElement(
                          _antd.Row,
                          null,
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 6 },
                              '一元购销售详情'
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 6 },
                              '销售总量：',
                              amount
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 6 },
                              '销售总额/元：',
                              (0, _commonUtil.moneyFormat)(salesAmount)
                          ),
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 6 },
                              '盈利总金额/元：',
                              (0, _commonUtil.moneyFormat)(profitAmount)
                          )
                      )
                  ),
                  _react2['default'].createElement(_antd.Table, {
                      className: 'product-sales-details-table',
                      rowKey: function (record, index) {
                          return index;
                      },
                      columns: columns,
                      dataSource: list,
                      pagination: false,
                      bordered: true,
                      loading: this.props.loading })
              );
          }
      }]);
  
      return ProductSalesDetailsYygTable;
  })(_react.Component);
  
  var ProductSalesDetailsTotal = (function (_Component5) {
      _inherits(ProductSalesDetailsTotal, _Component5);
  
      function ProductSalesDetailsTotal() {
          _classCallCheck(this, ProductSalesDetailsTotal);
  
          _get(Object.getPrototypeOf(ProductSalesDetailsTotal.prototype), 'constructor', this).apply(this, arguments);
  
          this.getColumns = function () {
              return [{
                  title: '销售数量',
                  dataIndex: 'amount',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text, 0);
                  }
              }, {
                  title: '销售金额/元',
                  dataIndex: 'salesAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text);
                  }
  
              }, {
                  title: '盈利金额/元',
                  dataIndex: 'profitAmount',
                  render: function render(text, record) {
                      return (0, _commonUtil.getSafeValue)(text);
                  }
              }];
          };
      }
  
      _createClass(ProductSalesDetailsTotal, [{
          key: 'render',
          value: function render() {
  
              var columns = this.getColumns();
  
              var list = [];
              if (this.props.data !== null) {
                  list = [this.props.data];
              }
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-sales-details-tit' },
                      _react2['default'].createElement(
                          _antd.Row,
                          null,
                          _react2['default'].createElement(
                              _antd.Col,
                              { span: 6 },
                              '总销售'
                          )
                      )
                  ),
                  _react2['default'].createElement(_antd.Table, {
                      className: 'product-sales-details-table',
                      rowKey: function (record, index) {
                          return index;
                      },
                      columns: columns,
                      dataSource: list,
                      pagination: false,
                      bordered: true,
                      loading: this.props.loading })
              );
          }
      }]);
  
      return ProductSalesDetailsTotal;
  })(_react.Component);
  
  module.exports = exports['default'];
  
  // 日期选择按钮
  
  // 日期选择回调
  
  // 生成对应字段
  
  // 生成对应字段
  
  // 生成对应字段

});
