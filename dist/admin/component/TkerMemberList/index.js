define('admin/component/TkerMemberList/index.jsx', function(require, exports, module) {

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
  
  var TKerMemberList = (function (_Component) {
      _inherits(TKerMemberList, _Component);
  
      function TKerMemberList(props) {
          _classCallCheck(this, TKerMemberList);
  
          _get(Object.getPrototypeOf(TKerMemberList.prototype), "constructor", this).call(this, props);
          this.state = {};
      }
  
      _createClass(TKerMemberList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var _props = this.props;
              var data = _props.data;
              var loading = _props.loading;
  
              if (!data) {
                  return null;
              }
  
              // let dataSource = data.content;
  
              var columns = [{
                  title: '会员编号',
                  dataIndex: 'cardNo',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.cardNo ? record.cardNo : '-'
                      );
                  }
              }, {
                  title: '会员姓名',
                  dataIndex: 'name',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.name ? record.name : record.mobile
                      );
                  }
              }, {
                  title: '集客人数',
                  dataIndex: 'opdata.tkerData.members',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('members') ? record.opdata.tkerData.members : '-'
                      );
                  }
              }, {
                  title: '直销商品数量',
                  dataIndex: 'opdata.tkerData.products',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('amount') ? record.opdata.tkerData.amount.lv0 : '-'
                      );
                  }
              }, {
                  title: '手机号',
                  dataIndex: 'mobile'
              }, {
                  title: '佣金/元',
                  dataIndex: 'opdata.tkerData.profit.lv0',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('profit') ? (record.opdata.tkerData.profit.lv0 / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '一级分润/元',
                  dataIndex: 'opdata.tkerData.profit.lv1',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('profit') ? (record.opdata.tkerData.profit.lv1 / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '二级分润/元',
                  dataIndex: 'opdata.tkerData.profit.lv2',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('profit') ? (record.opdata.tkerData.profit.lv2 / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '三级分润/元',
                  dataIndex: 'opdata.tkerData.profit.lv3',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('profit') ? (record.opdata.tkerData.profit.lv3 / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '总红利/元',
                  dataIndex: 'opdata.tkerData.profit.total',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('profit') ? ((record.opdata.tkerData.profit.lv1 + record.opdata.tkerData.profit.lv2 + record.opdata.tkerData.profit.lv3) / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '可提现额度/元',
                  dataIndex: 'withdraw',
                  render: function render(text, record) {
  
                      // 总红利
                      // opdata.tkerData.profit.total
                      // 提现金额
                      // opdata.ltkerData.account{pending,cleared}
  
                      // 最低提现10元
                      // 可提现额度 = record.tkerData.profit.total - record.tkerData.account.total - 10
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata && record.opdata.tkerData.hasOwnProperty('account') ? ((record.opdata.tkerData.profit.total - record.opdata.tkerData.account.total) / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style",
                                  onClick: function () {
                                      return _this.props.viewTker(record.createdBy);
                                  } },
                              "集客人数"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style",
                                  onClick: function () {
                                      return _this.props.viewDividend(record.createdBy);
                                  } },
                              "收益明细"
                          )
                      );
                  }
              }];
  
              var pagination = {
                  pageSize: data.size,
                  total: data.totalElements,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.list(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.list(page - 1);
                  }
              };
  
              /*dataSource = [
                  {
                      id:1,
                      memberNo:2,
                      name:0,
                      tker:3,
                      product:4,
                       lv0Profit:500,
                      lv1Profit:600,
                      lv2Profit:700,
                      lv3Profit:800,
                       dividend:900,
                      withdraw:1000
                     }
              ];*/
  
              var dataSource = [];
  
              data.content.map(function (item) {
  
                  dataSource.push(item);
              });
  
              return _react2["default"].createElement(_antd.Table, {
                  loading: loading,
                  rowKey: function (record) {
                      return record.id;
                  },
                  columns: columns,
                  dataSource: dataSource,
                  pagination: pagination,
                  bordered: true });
          }
      }]);
  
      return TKerMemberList;
  })(_react.Component);
  
  exports["default"] = TKerMemberList;
  module.exports = exports["default"];
  /*<Button className="button-style"
  onClick={()=>this.props.viewWithdraw(record.createdBy)}>提现记录</Button>*/

});
