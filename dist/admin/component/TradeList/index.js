define('admin/component/TradeList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var TradeList = (function (_Component) {
      _inherits(TradeList, _Component);
  
      function TradeList(props) {
          _classCallCheck(this, TradeList);
  
          _get(Object.getPrototypeOf(TradeList.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.moduleTypeCheck = function (data) {
  
              var moduleList = [{
                  'type': 'mall',
                  'name': '商城'
  
              }, {
                  'type': 'yyg',
                  'name': '一元购'
              }];
  
              if (data.mall) {
                  return {
                      'name': moduleList[0].name,
                      'cfg': data.mall,
                      'way': data.mallCfg
                  };
              } else {
                  return {
                      'name': moduleList[1].name,
                      'cfg': data.yyg
                  };
              }
          };
      }
  
      _createClass(TradeList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              //表格的columns
              var columns = [{
                  title: '序号',
                  dataIndex: 'index',
                  key: 'index'
              }, {
                  title: '缩略图',
                  dataIndex: 'thumbnail',
                  key: 'thumbnail',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement("img", { src: record.thumbnail, alt: "", style: { width: 60, height: 60 } });
                  }
              }, {
                  title: '商品编号',
                  dataIndex: 'code',
                  key: 'code',
                  sorter: function sorter(a, b) {
                      return a.code - b.code;
                  }
              }, {
                  title: '商品名称',
                  dataIndex: 'name',
                  key: 'name'
              }, {
                  title: '交易时间',
                  dataIndex: 'date',
                  key: 'date',
                  sorter: function sorter(a, b) {
                      return a.date - b.date;
                  },
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.date), "yyyy-MM-dd")
                      );
                  }
              }, {
                  title: '订单编号',
                  dataIndex: 'orderCode',
                  key: 'orderCode',
                  sorter: function sorter(a, b) {
                      return a.orderCode - b.orderCode;
                  }
              }, {
                  title: '交易期号',
                  dataIndex: 'number',
                  key: 'number'
              }];
  
              //交易模块删除，改为中奖编号（一元购）或手机号（商城）
              var column_yyg = [{
                  title: '中奖编号',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.ticket
                      );
                  }
              }, {
                  title: '实交易金额',
                  dataIndex: 'realAmount',
                  key: 'realAmount',
                  render: function render(text, record) {
                      var integral = '',
                          money = '';
  
                      switch (record.amount.payType) {
                          case 'balance':
                              money = record.amount.balance / 100;
                              break;
                          default:
                              money = record.amount.money / 100;
                              break;
                      }
  
                      var way = '无',
                          useMoney = true,
                          useIntegral = true;
  
                      for (var name in record.way) {
  
                          //过滤一下对象的属性
                          if (record.way[name] && record.way.hasOwnProperty(name)) {
                              switch (name) {
                                  case 'enableCash':
                                      way = '爆款';
                                      useIntegral = false;
                                      break;
                                  case 'enableIntegral':
                                      way = '积分兑换';
                                      useMoney = false;
                                      break;
                                  case 'enableIntegralCash':
                                      way = '积分优惠';
                                      break;
                                  case 'enableIntegralOffset':
                                      way = '积分抵现';
                                      break;
                                  case 'enableCoupon':
                                      way = '优惠券';
                                      useIntegral = false;
                                      break;
                                  default:
                                      way = '无';
                                      break;
                              }
                          }
                      }
  
                      switch (record.buyType) {
                          case 'mall':
                              integral = record.amount.integral;
                              break;
                          case 'yyg':
                              useIntegral = false;
                              integral = 0;
                              break;
                      }
                      return _react2["default"].createElement(
                          "div",
                          null,
                          useIntegral && _react2["default"].createElement(
                              "p",
                              null,
                              "积分：",
                              integral,
                              "分"
                          ),
                          useMoney && _react2["default"].createElement(
                              "p",
                              null,
                              "现金：",
                              money,
                              "元"
                          )
                      );
                  }
              }];
  
              var column_mall = [{
                  title: '手机号',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.logistics.mobile
                      );
                  }
              }, {
                  title: '交易金额',
                  dataIndex: 'amount',
                  key: 'amount',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.totalMoney / 100,
                          "元"
                      );
                  }
              }, {
                  title: '实交易金额',
                  dataIndex: 'realAmount',
                  key: 'realAmount',
                  render: function render(text, record) {
                      var integral = '',
                          money = '';
  
                      switch (record.amount.payType) {
                          case 'balance':
                              money = record.amount.balance / 100;
                              break;
                          default:
                              money = record.amount.money / 100;
                              break;
                      }
  
                      var way = '无',
                          useMoney = true,
                          useIntegral = true;
  
                      for (var name in record.way) {
  
                          //过滤一下对象的属性
                          if (record.way[name] && record.way.hasOwnProperty(name)) {
                              switch (name) {
                                  case 'enableCash':
                                      way = '爆款';
                                      useIntegral = false;
                                      break;
                                  case 'enableIntegral':
                                      way = '积分兑换';
                                      useMoney = false;
                                      break;
                                  case 'enableIntegralCash':
                                      way = '积分优惠';
                                      break;
                                  case 'enableIntegralOffset':
                                      way = '积分抵现';
                                      break;
                                  case 'enableCoupon':
                                      way = '优惠券';
                                      useIntegral = false;
                                      break;
                                  default:
                                      way = '无';
                                      break;
                              }
                          }
                      }
  
                      switch (record.buyType) {
                          case 'mall':
                              integral = record.amount.integral;
                              break;
                          case 'yyg':
                              useIntegral = false;
                              integral = 0;
                              break;
                      }
                      return _react2["default"].createElement(
                          "div",
                          null,
                          useIntegral && _react2["default"].createElement(
                              "p",
                              null,
                              "积分：",
                              integral,
                              "分"
                          ),
                          useMoney && _react2["default"].createElement(
                              "p",
                              null,
                              "现金：",
                              money,
                              "元"
                          )
                      );
                  }
              }, {
                  title: '优惠方式',
                  dataIndex: 'preferentialWay',
                  key: 'preferentialWay',
                  render: function render(text, record) {
  
                      var way = '无';
  
                      for (var name in record.way) {
  
                          //过滤一下对象的属性
                          if (record.way[name] == true && record.way.hasOwnProperty(name)) {
                              switch (name) {
                                  case 'enableCash':
                                      way = '爆款';
                                      break;
                                  case 'enableIntegral':
                                      way = '积分兑换';
                                      break;
                                  case 'enableIntegralCash':
                                      way = '积分优惠';
                                      break;
                                  case 'enableIntegralOffset':
                                      //缺少积分和现金的兑换比
                                      way = '积分抵现';
                                      // way = '积分抵现'+record.amount.integral+'元';
                                      break;
                                  case 'enableCoupon':
                                      // console.log(record.amount);
                                      if (record.amount.userCoupon) {
                                          switch (record.amount.userCoupon.couponType) {
                                              case 'discount':
                                                  way = record.amount.userCoupon.discount + '折优惠券';
                                                  break;
                                              case 'quota':
                                                  way = record.amount.userCoupon.faceValue / 100 + '元优惠券';
                                                  break;
                                          }
                                      } else {
                                          way = '未使用优惠券';
                                      }
  
                                      break;
                                  default:
                                      way = '无';
                                      break;
                              }
                          }
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          way
                      );
                  }
              }];
  
              var column3 = [{
                  title: '收货人',
                  dataIndex: 'consignee',
                  key: 'consignee',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              "a",
                              { onClick: function () {
                                      return _this.props.showConsignee(record.id);
                                  } },
                              record.consignee
                          )
                      );
                  }
              }, {
                  title: '物流状态',
                  dataIndex: 'status',
                  key: 'status',
                  filters: [{
                      text: '待发货',
                      value: 'todelivery'
                  }, {
                      text: '已发货',
                      value: 'shipped'
                  }, {
                      text: '已收货',
                      value: 'received'
                  }],
                  onFilter: function onFilter(value, record) {
                      return record.status.indexOf(value) === 0;
                  },
                  //sorter: (a, b) => a.status - b.status,
                  render: function render(text, record) {
  
                      var tradeStatus = undefined,
                          drawStatus = undefined,
                          payStatus = undefined;
  
                      switch (record.status) {
                          case 'topay':
                              tradeStatus = '待支付';
                              break;
                          case 'todelivery':
                              tradeStatus = '待发货';
                              break;
                          case 'shipped':
                              tradeStatus = '已发货';
                              break;
                          case 'received':
                              tradeStatus = '已收货';
                              break;
                          case 'show':
                              tradeStatus = '已晒图';
                              break;
                          default:
                              tradeStatus = '暂无';
                              break;
  
                      }
  
                      switch (_this.props.buyType) {
                          case 'mall':
                              switch (record.pay) {
                                  case 's0':
                                      payStatus = '未支付';
                                      break;
                                  case 's1':
                                      payStatus = '已支付';
                                      break;
                              }
  
                              break;
  
                          case 'yyg':
                              switch (record.draw) {
                                  case 'todraw':
                                      drawStatus = '等待开奖';
                                      break;
                                  case 'noluck':
                                      drawStatus = '未中奖';
                                      break;
                                  case 'toaccept':
                                      drawStatus = '等待领奖';
                                      break;
  
                              }
                              break;
                      }
  
                      if (record.address) {
                          for (var attr in record.address) {
                              if (record.address[attr] == '') {
                                  tradeStatus = '暂无';
                              }
                          }
                      } else {
                          tradeStatus = '暂无';
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          { style: { 'textAlign': 'center' } },
                          _react2["default"].createElement(
                              "p",
                              { style: { 'color': record.status == 'todelivery' ? '#ea5035' : 'black' } },
                              tradeStatus
                          )
                      );
                  }
              }, {
                  title: '运单号',
                  dataIndex: 'billNumber',
                  key: 'billNumber',
                  render: function render(text, record) {
  
                      var status = '';
  
                      switch (record.status) {
                          case 'shipped':
                              status = '已发货';
                              break;
                          default:
                              status = '其他';
                              break;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              "a",
                              { onClick: status == '其他' ? function () {
                                      return _this.props.showLogistics(record.id);
                                  } : function () {
                                      return _this.props.submit(record.id);
                                  } },
                              record.billNumber
                          )
                      );
                  }
              }, {
                  title: '物流商',
                  dataIndex: 'logistics',
                  key: 'logistics',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.logistics.vendor
                      );
                  }
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  key: 'operation',
                  render: function render(text, record) {
  
                      var title = '',
                          type = '',
                          disabled = false;
  
                      switch (_this.props.buyType) {
                          case 'mall':
                              switch (record.status) {
                                  case 'topay':
                                      type = 'primary';
                                      title = '提交物流';
                                      disabled = true;
                                      break;
                                  case 'todelivery':
                                      type = 'primary';
                                      title = '提交物流';
                                      break;
                                  case 'shipped':
                                      title = '确认收货';
                                      break;
                                  case 'received':
                                      title = '确认收货';
                                      disabled = true;
                                      break;
                                  default:
                                      type = 'primary';
                                      title = '提交物流';
                                      disabled = true;
                                      break;
  
                              }
                              break;
                          case 'yyg':
                              switch (record.draw) {
                                  case 'todraw':
                                      type = 'primary';
                                      title = '提交物流';
                                      disabled = true;
                                      break;
                                  case 'noluck':
                                      type = 'primary';
                                      title = '提交物流';
                                      disabled = true;
                                      break;
                                  case 'toaccept':
                                      type = 'primary';
                                      title = '提交物流';
                                      disabled = true;
                                      break;
                                  case 'todelivery':
                                      type = 'primary';
                                      title = '提交物流';
                                      break;
                                  case 'shipped':
                                      title = '确认收货';
                                      break;
                                  case 'received':
                                      title = '确认收货';
                                      disabled = true;
                                      break;
                                  default:
                              }
                              break;
                      }
  
                      if (record.address) {
                          for (var attr in record.address) {
                              if (record.address[attr] == '') {
                                  disabled = true;
                              }
                          }
                      } else {
                          disabled = true;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { type: type,
                                  disabled: disabled,
                                  onClick: title == '提交物流' ? function () {
                                      return _this.props.submit(record.id);
                                  } : function () {
                                      return _this.props.confirmDelete({ record: record });
                                  } },
                              title
                          )
                      );
                  }
              }];
  
              //console.log(this.props.buyType);
              //debug
              switch (this.props.buyType) {
                  case 'mall':
                      columns = columns.concat(column_mall, column3);
                      break;
                  case 'yyg':
                      columns = columns.concat(column_yyg, column3);
                      break;
              }
  
              var _props = this.props;
              var data = _props.data;
              var list = _props.list;
  
              if (!list) {
                  return null;
              }
  
              //
  
              var dataList = data;
  
              var dataSource = [];
  
              for (var i = 0; i < dataList.length; i++) {
  
                  var scrData = dataList[i];
  
                  //console.log(dataList[i].logistic);
  
                  scrData.key = i;
                  scrData.index = i + 1;
  
                  var _data = {
                      index: i + 1,
                      buyType: dataList[i].buyType,
                      id: dataList[i].id,
                      thumbnail: _commonUtilMedia2["default"].getMediaUrl(dataList[i].coverImgId),
                      code: dataList[i].productCode,
                      name: dataList[i].productName,
                      date: dataList[i].lastModifiedDate,
                      orderCode: dataList[i].tradeNo,
                      number: dataList[i].issueNo,
  
                      address: dataList[i].address,
  
                      ticket: dataList[i].ticket ? dataList[i].ticket : '',
                      module: this.moduleTypeCheck(dataList[i]).name,
                      amount: this.moduleTypeCheck(dataList[i]).cfg,
  
                      way: this.moduleTypeCheck(dataList[i]).way ? this.moduleTypeCheck(dataList[i]).way : '',
                      totalMoney: dataList[i].totalMoney ? dataList[i].totalMoney : '',
  
                      consignee: dataList[i].address ? dataList[i].address.name : '',
                      status: dataList[i].tradeStatus ? dataList[i].tradeStatus : 'none',
                      draw: dataList[i].drawStatus ? dataList[i].drawStatus : 'none',
                      pay: dataList[i].payStatus ? dataList[i].payStatus : 'none',
                      billNumber: dataList[i].logistic != undefined ? dataList[i].logistic.code : '',
                      logistics: {
                          vendor: dataList[i].logistic != undefined ? dataList[i].logistic.vendor : '',
                          name: dataList[i].address ? dataList[i].address.name : '',
                          mobile: dataList[i].address ? dataList[i].address.mobile : '',
                          address: dataList[i].address ? dataList[i].address.prov + ' ' + dataList[i].address.city + ' ' + dataList[i].address.region + ' ' + dataList[i].address.street : ''
                      }
                  };
                  //console.log(this.moduleTypeCheck(dataList[i]).cfg);
                  dataSource.push(_data);
              }
  
              //分页
              var pagination = {
                  total: this.props.total,
                  showSizeChanger: true,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.list(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.list(page - 1);
                  }
              };
  
              // console.log(columns);
  
              return _react2["default"].createElement(_antd.Table, { columns: columns,
                  rowKey: function (record) {
                      return record.id;
                  },
                  pagination: pagination,
                  dataSource: dataSource,
                  // scroll={{ x: 1500, y: 300 }}
                  bordered: true });
          }
      }]);
  
      return TradeList;
  })(_react.Component);
  
  exports["default"] = TradeList;
  module.exports = exports["default"];

});
