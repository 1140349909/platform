define('admin/view/withdraw/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _commonBasePageBase = require("common/base/PageBase.jsx");
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _storeWithdrawAction = require("admin/store/withdraw/action");
  
  var withdrawAction = _interopRequireWildcard(_storeWithdrawAction);
  
  var _componentWithdrawList = require("admin/component/WithdrawList/index.jsx");
  
  var _componentWithdrawList2 = _interopRequireDefault(_componentWithdrawList);
  
  var _commonComponentSearchInput = require("common/component/SearchInput/index.jsx");
  
  var _commonComponentSearchInput2 = _interopRequireDefault(_commonComponentSearchInput);
  
  // 提现管理
  
  var WithdrawIndex = (function (_PageBase) {
      _inherits(WithdrawIndex, _PageBase);
  
      function WithdrawIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _WithdrawIndex);
  
          _get(Object.getPrototypeOf(_WithdrawIndex.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.list = function (status, page, size) {
  
              _this.setState({
                  status: status
              });
  
              _this.props.actions.getManagerWithdrawList({
                  mobile: _this.state.mobile,
                  status: status,
                  page: page,
                  size: size
              });
          };
  
          this.handleSearch = function (mobile) {
              var status = _this.state.status;
  
              _this.setState({
                  mobile: mobile
              }, function () {
                  _this.list(status, 0);
              });
          };
  
          this.updateManagerWithdrawStatus = function (data) {
  
              var list = [];
  
              if (Array.isArray(data)) {
                  list = data;
              } else {
                  list.push(data);
              }
  
              _this.props.actions.updateManagerWithdrawStatus(list);
          };
  
          this.updateManagerWithdrawConfirm = function (selected, value) {
  
              var data = [],
                  payType = '';
  
              var list = [];
  
              //先测试单个，后期测试批量
              if (Array.isArray(selected)) {
  
                  selected.map(function (item) {
                      data.push(item.id);
  
                      if (payType != '' && payType != item.payType) {
                          _antd.message.error('选择的支付类型不统一，请重新选择！');
                          return;
                      } else {
                          payType = item.payType;
                      }
                  });
  
                  list = data;
              } else {
  
                  list.push(selected.id);
                  payType = selected.payType;
              }
  
              var submitData = {
                  "ids": list,
                  // 需要选择是否通过
                  "pass": value,
                  // 如不通过需要说明理由
                  "reason": "test",
                  // 需要统一批量提交的支付类型['wechat', 'alipay', 'unionpay', 'balance', 'integraloffset', 'unknown']
                  "payType": payType
  
              };
  
              _this.props.actions.updateManagerWithdrawConfirm(submitData);
          };
  
          this.callback = function (key) {
              _this.list(key, 0);
          };
      }
  
      _createClass(WithdrawIndex, [{
          key: "componentDidMount",
          value: function componentDidMount() {
              this.list('news', 0);
          }
      }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              var status = this.state.status;
  
              switch (operation.type) {
  
                  case withdrawAction.GET_MANAGER_WITHDRAW_LIST:
                      break;
                  case withdrawAction.UPDATE_MANAGER_WITHDRAW_STATUS:
  
                      if (operation.data.result) {
                          var result = operation.data.result;
                          _antd.message.warning(result.err_code_des);
                      } else {
                          var result = operation.data[0].payStatus;
  
                          // s0:未支付,s1支付完成,s2支付失败,s3超时支付关闭,s4主动支付取消
  
                          switch (result) {
                              case 's0':
                                  _antd.message.info('提现未开始');
                                  break;
                              case 's1':
                                  _antd.message.success('提现完成');
                                  break;
                              case 's2':
                                  _antd.message.error('提现失败');
                                  break;
                              case 's3':
                                  _antd.message.warning('提现超时，已关闭');
                                  break;
                              case 's4':
                                  _antd.message.warn('提现取消');
                                  break;
                              case 's5':
                                  _antd.message.loading('正在提现中，请稍候');
                                  break;
                          }
                      }
  
                      this.list(status, 0);
                      break;
                  case withdrawAction.UPDATE_MANAGER_WITHDRAW_CONFIRM:
                      console.log(operation);
                      var alipayUrl = '';
  
                      if (operation.data) {
                          alipayUrl = operation.data;
                          window.open(alipayUrl);
                      }
  
                      _antd.message.success('操作成功！');
                      this.list(status, 0);
                      break;
  
              }
          }
  
          // 获取提现列表
      }, {
          key: "render",
          value: function render() {
              var operation = this.props.operation;
  
              var TabPane = _antd.Tabs.TabPane;
  
              var status = this.state.status;
  
              var extra = _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(_commonComponentSearchInput2["default"], { placeholder: "请输入手机号进行查询",
                      onSearch: this.handleSearch,
                      style: { width: 200 } })
              );
  
              // 是否显示loading
              var isListLoading = operation.type == withdrawAction.GET_MANAGER_WITHDRAW_LIST && operation.pending;
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Card,
                      { title: "提现管理", extra: null },
                      _react2["default"].createElement(
                          _antd.Tabs,
                          { onChange: this.callback, type: "card" },
                          _react2["default"].createElement(TabPane, { tab: "新申请", key: "news" }),
                          _react2["default"].createElement(TabPane, { tab: "正在处理", key: "process" }),
                          _react2["default"].createElement(TabPane, { tab: "处理成功", key: "success" }),
                          _react2["default"].createElement(TabPane, { tab: "处理失败", key: "failure" })
                      ),
                      _react2["default"].createElement(_componentWithdrawList2["default"], {
                          data: this.props.withdraw.data,
                          status: status,
                          listLoading: isListLoading,
                          list: this.list,
                          updateManagerWithdrawStatus: this.updateManagerWithdrawStatus,
                          updateManagerWithdrawConfirm: this.updateManagerWithdrawConfirm
                      })
                  )
              );
          }
      }]);
  
      var _WithdrawIndex = WithdrawIndex;
      WithdrawIndex = (0, _reactRedux.connect)(function (state) {
          return {
              withdraw: state.withdraw.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, withdrawAction), dispatch)
          };
      })(WithdrawIndex) || WithdrawIndex;
      return WithdrawIndex;
  })(_commonBasePageBase2["default"]);
  
  exports["default"] = WithdrawIndex;
  module.exports = exports["default"];
  
  // 根据手机号搜索提现记录
  
  //查询提现状态
  
  //确认操作是拒绝还是提现
  
  //Tab切换的onChange函数

});
