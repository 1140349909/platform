define('admin/component/WithdrawList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var WithdrawList = (function (_Component) {
      _inherits(WithdrawList, _Component);
  
      function WithdrawList(props) {
          _classCallCheck(this, WithdrawList);
  
          _get(Object.getPrototypeOf(WithdrawList.prototype), "constructor", this).call(this, props);
          this.state = {
              selectedRowKeys: [], // 这里配置默认勾选列
              selectedRows: []
          };
      }
  
      _createClass(WithdrawList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var _props = this.props;
              var data = _props.data;
              var loading = _props.loading;
              var listLoading = _props.listLoading;
              var status = _props.status;
  
              if (!data) {
                  return null;
              }
  
              var dataSource = data.content;
  
              var _state = this.state;
              var selectedRowKeys = _state.selectedRowKeys;
              var selectedRows = _state.selectedRows;
  
              //rowSelection：选择功能的配置
              var rowSelection = {
                  selectedRowKeys: selectedRowKeys,
                  selectedRows: selectedRows,
                  onChange: function onChange(selectedRowKeys, selectedRows) {
                      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                      _this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: selectedRows });
                  },
                  onSelect: function onSelect(record, selected, selectedRows) {
  
                      selectedRowKeys = [];
  
                      selectedRows.map(function (item) {
                          selectedRowKeys.push(item.id);
                      });
  
                      //console.log(record, selected, selectedRows);
                      _this.setState({ selectedRows: selectedRows, selectedRowKeys: selectedRowKeys });
                  },
                  onSelectAll: function onSelectAll(selected, selectedRows, changeRows) {
                      //console.log(selected, selectedRows, changeRows);
  
                      selectedRowKeys = [];
  
                      selectedRows.map(function (item) {
                          selectedRowKeys.push(item.id);
                      });
  
                      _this.setState({ selectedRows: selectedRows, selectedRowKeys: selectedRowKeys });
                  }
              };
  
              /*getCheckboxProps: record => ({
               disabled: record.hasRes  // 配置无法勾选的列
               })*/
              var hasSelected = selectedRowKeys.length > 0;
  
              var payFailureColumns = [{
                  title: '失败原因',
                  dataIndex: 'result',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.result ? record.result.err_code_des : '暂无'
                      );
                  }
              }];
  
              var columns = [{
                  title: '订单序号',
                  dataIndex: 'orderNo'
              }, {
                  title: '会员编号',
                  dataIndex: 'cardNo'
              }, /*{
                 title: '会员姓名',
                 dataIndex: 'name'
                 },*/{
                  title: '手机号码',
                  dataIndex: 'mobile'
              }, {
                  title: '总红利/元',
                  dataIndex: 'dividend',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata.tkerData ? (record.opdata.tkerData.profit.total / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '可提现额度/元',
                  dataIndex: 'withdraw',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata.tkerData ? ((record.opdata.tkerData.profit.total - record.opdata.tkerData.account.total) / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '申请提现/元',
                  dataIndex: 'apply',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (record.money / 100).toFixed(2)
                      );
                  }
              }, {
                  title: '申请时间',
                  dataIndex: 'time',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.lastModifiedDate), "yyyy-MM-dd")
                      );
                  }
              }, {
                  title: '提现方式',
                  dataIndex: 'withdrawType',
                  filters: [{
                      text: '微信',
                      value: 'wechat'
                  }, {
                      text: '支付宝',
                      value: 'alipay'
                  }, {
                      text: '余额',
                      value: 'balance'
                  }],
                  onFilter: function onFilter(value, record) {
                      return record.payType == value;
                  },
                  render: function render(text, record) {
  
                      var withdrawType = '';
  
                      switch (record.payType) {
                          case 'balance':
                              withdrawType = '余额';
                              break;
                          case 'wechat':
                              withdrawType = '微信钱包';
                              break;
                          case 'alipay':
                              withdrawType = '支付宝钱包';
                              break;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          withdrawType
                      );
                  }
              }];
  
              var operationColumn = [{
                  title: '操作',
                  dataIndex: 'operation',
                  render: function render(text, record, index) {
  
                      var button = '';
  
                      switch (record.payStatus) {
                          case 's0':
                              // {/*loading={this.props.items[record.id]}*/}
                              button = _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      {
                                          onClick: function () {
                                              return _this.props.updateManagerWithdrawConfirm(record, true);
                                          } },
                                      "确认申请"
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      {
                                          onClick: function () {
                                              return _this.props.updateManagerWithdrawConfirm(record, false);
                                          } },
                                      "直接拒绝"
                                  )
                              );
                              break;
                          case 's5':
                              // {/*loading={this.props.items[record.id]}*/}
                              button = _react2["default"].createElement(
                                  _antd.Button,
                                  {
                                      onClick: function () {
                                          return _this.props.updateManagerWithdrawStatus(record.id);
                                      } },
                                  "查询状态"
                              );
                              break;
                          case 's1':
                              button = null;
                              break;
                          case 's2':
                              // 失败时有几个按钮：重新确认、直接退款、直接拒绝
  
                              /*button = (
                               <Button
                               loading={this.props.items[record.id]}
                               onClick={()=>this.props.updateManagerWithdrawConfirm(record.id)}>
                               重新确认
                               </Button>
                               );*/
                              button = _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      {
                                          onClick: function () {
                                              return _this.props.updateManagerWithdrawConfirm(record, true);
                                          } },
                                      "重新确认"
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      {
                                          onClick: function () {
                                              return _this.props.updateManagerWithdrawConfirm(record, false);
                                          } },
                                      "直接拒绝"
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      { type: "primary", disabled: true },
                                      "直接退款"
                                  )
                              );
                              break;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          button
                      );
                  }
              }];
  
              switch (status) {
                  case 'failure':
                      columns = columns.concat(payFailureColumns, operationColumn);
                      break;
                  default:
                      columns = columns.concat(operationColumn);
                      break;
  
              }
  
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
  
              // 批量操作时需要提示取现类型为同一种，不允许微信/支付宝混合提现
              // rowSelection={status == 'success' ? null : rowSelection}
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(_antd.Table, {
                      loading: listLoading,
  
                      rowKey: function (record) {
                          return record.id;
                      },
                      columns: columns,
                      dataSource: dataSource,
                      pagination: pagination,
                      bordered: true })
              );
          }
      }]);
  
      return WithdrawList;
  })(_react.Component);
  
  exports["default"] = WithdrawList;
  module.exports = exports["default"];
  /*{dataSource.length > 0 &&
  <div style={{marginTop: -40}}>
     {status == 'process' &&
     <Button
         disabled={!hasSelected}
         onClick={()=>this.props.updateManagerWithdrawStatus(selectedRows)}>
         批量查询
     </Button>
     }
     {status == 'new' &&
     <Button
         disabled={!hasSelected}
         onClick={()=>this.props.updateManagerWithdrawConfirm(selectedRows)}>
         批量确认
     </Button>
     }
  </div>}*/

});
