define('admin/component/CouponList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var CouponList = (function (_Component) {
      _inherits(CouponList, _Component);
  
      function CouponList(props) {
          _classCallCheck(this, CouponList);
  
          _get(Object.getPrototypeOf(CouponList.prototype), "constructor", this).call(this, props);
          this.state = {
              selectedRowKeys: [], // 这里配置默认勾选列
              selectedRows: []
          };
  
          this.Percentage = function (num) {
              return Math.round(num * 10000) / 100.00 + "%";
          };
  
          this.validRangeDate = function (addValue) {
  
              var dd = new Date();
              //dd.setDate(dd.getDate()-1);
              var y1 = dd.getFullYear();
              var m1 = dd.getMonth(); //获取当前月份的日期
              var d1 = dd.getDate();
              //获取日期时间，1天的毫秒数是86400000
              var ss = new Date(new Date(y1, m1, d1).getTime() + 86400000 * addValue);
              //日期格式化
              var y2 = ss.getFullYear();
              var m2 = ss.getMonth() + 1 < 10 ? '0' + (ss.getMonth() + 1).toString() : ss.getMonth() + 1; //获取当前月份的日期
              var d2 = ss.getDate() < 10 ? '0' + ss.getDate().toString() : ss.getDate();
  
              return y2 + '-' + m2 + '-' + d2;
          };
      }
  
      _createClass(CouponList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var _state = this.state;
              var selectedRowKeys = _state.selectedRowKeys;
              var selectedRows = _state.selectedRows;
  
              //rowSelection：选择功能的配置
              var rowSelection = {
                  selectedRowKeys: selectedRowKeys,
                  selectedRows: selectedRows,
                  onChange: function onChange(selectedRowKeys, selectedRows) {
                      _this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
                  },
                  onSelect: function onSelect(record, selected, selectedRows) {
                      _this.setState({ selectedRows: selectedRows });
                  },
                  onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {
                      _this.setState({ selectedRows: selectedRows });
                  },
                  getCheckboxProps: function getCheckboxProps(record) {
                      return {
                          disabled: record.hasRes // 配置无法勾选的列
                      };
                  }
              };
  
              var hasSelected = selectedRowKeys.length > 0;
  
              //表格的columns
              var columns = [{
                  title: '序号',
                  dataIndex: 'index',
                  key: 'index'
              }, {
                  title: '优惠券类型',
                  dataIndex: 'couponTypeText',
                  key: 'couponTypeText',
                  /*filters: [{
                      text: '定额优惠券',
                      value: '定'
                  }, {
                      text: '折扣优惠券',
                      value: '折'
                  }],
                  onFilter: (value, record) => record.couponTypeText.indexOf(value) === 0,*/
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.couponTypeText
                      );
                  }
              }, {
                  title: '优惠券名称',
                  dataIndex: 'name',
                  key: 'name'
              }, {
                  title: '优惠额度',
                  dataIndex: 'couponValueText',
                  key: 'couponValueText',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.couponValueText
                      );
                  }
              }, {
                  title: '最低消费',
                  dataIndex: 'charge',
                  key: 'charge',
                  render: function render(text, record) {
  
                      if (record.charge.enable) {
                          return _react2["default"].createElement(
                              "div",
                              null,
                              record.charge.min / 100,
                              "元"
                          );
                      } else {
                          return _react2["default"].createElement(
                              "div",
                              null,
                              "无限制"
                          );
                      }
                  }
              }, {
                  title: '有效期',
                  dataIndex: 'expiryDate',
                  key: 'expiryDate',
                  render: function render(text, record) {
  
                      if (record.expiryDate.interval.enable) {
  
                          return _react2["default"].createElement(
                              "div",
                              null,
                              (0, _commonUtilIndex.dateFormat)(new Date(parseInt(record.expiryDate.interval.startDate)), "yyyy-MM-dd"),
                              _react2["default"].createElement(
                                  "span",
                                  null,
                                  "至"
                              ),
                              (0, _commonUtilIndex.dateFormat)(new Date(parseInt(record.expiryDate.interval.endDate)), "yyyy-MM-dd")
                          );
                      }
  
                      if (record.expiryDate.dynamic.enable) {
  
                          return _react2["default"].createElement(
                              "div",
                              null,
                              _this.validRangeDate(record.expiryDate.dynamic.begin),
                              "至",
                              _this.validRangeDate(record.expiryDate.dynamic.end)
                          );
  
                          /*return (
                              <div>
                                  领券
                                  {record.expiryDate.dynamic.begin}
                                  <span>天后生效，有效天数</span>
                                  {record.expiryDate.dynamic.end}
                                  <span>天</span>
                              </div>
                          );*/
                      }
                  }
              }, {
                  title: '创建日期',
                  dataIndex: 'createDate',
                  key: 'createDate',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(parseInt(record.createdDate)), "yyyy-MM-dd hh:mm")
                      );
                  }
              }, {
                  title: '券总数',
                  dataIndex: 'total',
                  key: 'total'
              }, {
                  title: '限领数',
                  dataIndex: 'limit',
                  key: 'limit'
              }, {
                  title: '已领取总数',
                  dataIndex: 'reception',
                  key: 'reception'
              }, {
                  title: '已核销总数',
                  dataIndex: 'verification',
                  key: 'verification'
              }, {
                  title: '领取率',
                  dataIndex: 'receptionRate',
                  key: 'receptionRate',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.receptionRate
                      );
                  }
              }, {
                  title: '核销率',
                  dataIndex: 'verificationRate',
                  key: 'verificationRate',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.verificationRate
                      );
                  }
  
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  key: 'operation',
                  render: function render(text, record) {
  
                      // showForm
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style",
                                  onClick: function () {
                                      return _this.props.showAddNumber(record.id);
                                  } },
                              "追加数量"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style", disabled: !record.hasRes || record.isEnd,
                                  onClick: function () {
                                      return _this.props.showCouponInfo(record.id);
                                  } },
                              "投放详情"
                          )
                      );
                  }
              }];
  
              var dataList = this.props.data != undefined ? this.props.data : [];
  
              var dataSource = [];
  
              for (var i = 0; i < dataList.length; i++) {
  
                  var scrData = dataList[i];
  
                  scrData.key = i;
                  scrData.index = i + 1;
  
                  /*使用数
                   used
                   兑换数
                   cashed
                   领取数
                   recieved*/
  
                  var couponValueText = '';
                  var couponTypeText = '';
  
                  switch (scrData.couponType) {
                      case 'quota':
                          couponTypeText = '定额优惠券';
                          couponValueText = scrData.faceValue / 100 + '元';
                          break;
                      case 'discount':
                          couponTypeText = '折扣优惠券';
                          couponValueText = scrData.discount + '折';
                          break;
  
                  }
  
                  var isEnd = false;
  
                  //失效日期判定
                  if (scrData.rule.give.period.interval.enable) {
  
                      var nowDate = new Date().getTime();
                      var endDate = parseInt(scrData.rule.give.period.interval.endDate) + 86400000;
  
                      isEnd = nowDate >= endDate;
                  }
  
                  var data = {
                      id: scrData.id,
                      key: scrData.key,
                      index: scrData.index,
                      couponType: scrData.couponType,
                      name: scrData.name,
  
                      couponTypeText: couponTypeText,
                      couponValueText: couponValueText,
  
                      expiryDate: scrData.rule.give.period,
                      charge: scrData.rule.give.charge,
                      total: scrData.total == -1 ? '不限' : scrData.total,
                      reception: scrData.recieved,
                      verification: scrData.cashed,
                      receptionRate: scrData.total != -1 ? this.Percentage(scrData.recieved / scrData.total) : '-',
                      verificationRate: scrData.total != -1 ? this.Percentage(scrData.cashed / scrData.total) : '-',
                      hasRes: scrData.resId ? true : false,
                      isEnd: isEnd,
                      limit: scrData.rule.receive.perTotal,
                      createdDate: scrData.createdDate
                  };
  
                  dataSource.push(data);
              }
  
              //分页
              var pagination = {
                  total: this.props.total,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.list(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.list(page - 1);
                  }
              };
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(_antd.Table, { rowSelection: rowSelection,
                      columns: columns,
                      loading: this.props.loading,
                      rowKey: function (record) {
                          return record.index;
                      },
                      pagination: pagination,
                      dataSource: dataSource,
                      bordered: true }),
                  dataSource.length > 0 && _react2["default"].createElement(
                      "div",
                      { style: { marginTop: -40 } },
                      _react2["default"].createElement(
                          _antd.Button,
                          { type: "primary",
                              onClick: function () {
                                  return _this.props.deleteCoupon(selectedRows);
                              },
                              disabled: !hasSelected },
                          "删除"
                      ),
                      _react2["default"].createElement(
                          "span",
                          { style: { marginLeft: 8 } },
                          "仅未投放过的优惠券可进行删除"
                      )
                  )
              );
          }
      }]);
  
      return CouponList;
  })(_react.Component);
  
  exports["default"] = CouponList;
  module.exports = exports["default"];
  
  //有效期转具体日期
  /*<Button className="button-style" disabled={record.hasRes}
  onClick={()=>this.props.deleteCoupon(record.id)}>删除</Button>*/

});
