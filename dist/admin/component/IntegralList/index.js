define('admin/component/IntegralList/index.jsx', function(require, exports, module) {

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
          this.state = {};
  
          this.Percentage = function (num) {
              return Math.round(num * 10000) / 100.00 + "%";
          };
      }
  
      _createClass(CouponList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              //表格的columns
              var columns = [{
                  title: '积分包名称',
                  dataIndex: 'name',
                  key: 'name'
              }, {
                  title: '创建日期',
                  dataIndex: 'createDate',
                  key: 'createDate',
                  render: function render(text, record) {
  
                      //console.log(record.createdDate);
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(parseInt(record.createdDate)), "yyyy-MM-dd hh:mm")
                      );
                  }
              }, {
                  title: '总分发数量',
                  dataIndex: 'total',
                  key: 'total'
              }, {
                  title: '限领数',
                  dataIndex: 'limit',
                  key: 'limit'
              }, {
                  title: '已领取数量',
                  dataIndex: 'reception',
                  key: 'reception'
              }, {
                  title: '领取率',
                  dataIndex: 'receptionRate',
                  key: 'receptionRate'
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  key: 'operation',
                  render: function render(text, record) {
  
                      //console.log(this.props)
  
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
                              { className: "button-style", disabled: !record.hasRes,
                                  onClick: function () {
                                      return _this.props.showIntegralInfo(record.id);
                                  } },
                              "投放详情"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style", disabled: record.hasRes,
                                  onClick: function () {
                                      return _this.props.deleteIntegral(record.id);
                                  } },
                              "删除"
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
  
                  var data = {
                      id: scrData.id,
                      key: scrData.key,
                      index: scrData.index,
                      name: scrData.integral + '积分兑换券',
                      total: scrData.total == -1 ? '不限' : scrData.total,
                      reception: scrData.recieved,
                      receptionRate: scrData.total == -1 ? '-' : this.Percentage(scrData.recieved / scrData.total),
                      hasRes: scrData.resId ? true : false,
                      limit: scrData.perTotal,
                      createdDate: scrData.createdDate
                      //hasRes:true
  
                      /*expiryDate: scrData.rule.give.period,
                      total: scrData.total == -1 ? '不限' : scrData.total,
                      reception: scrData.recieved,
                      verification: scrData.cashed,
                      receptionRate: scrData.recieved != 0 ? scrData.used / scrData.recieved : 0,
                      verificationRate: scrData.recieved != 0 ? scrData.cashed / scrData.recieved : 0*/
                  };
  
                  dataSource.push(data);
              }
  
              //console.log(this.props.resTotal);
  
              //分页
              var pagination = {
                  total: this.props.resTotal,
                  showSizeChanger: true,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.resList(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.resList(page - 1);
                  }
              };
  
              //console.log(this.props);
  
              return _react2["default"].createElement(_antd.Table, { columns: columns,
                  rowKey: function (record) {
                      return record.index;
                  },
                  loading: this.props.loading,
                  pagination: pagination,
                  dataSource: dataSource,
                  bordered: true });
          }
      }]);
  
      return CouponList;
  })(_react.Component);
  
  exports["default"] = CouponList;
  module.exports = exports["default"];

});
