define('admin/view/setting/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _commonBasePageBase = require('common/base/PageBase.jsx');
  
  var _commonBasePageBase2 = _interopRequireDefault(_commonBasePageBase);
  
  var _redux = require('node_modules/redux/lib/index');
  
  var _reactRedux = require('node_modules/react-redux/lib/index');
  
  var _componentSettingCard = require('admin/component/SettingCard/index.jsx');
  
  var _componentSettingCard2 = _interopRequireDefault(_componentSettingCard);
  
  var _componentSettingWechatForm = require('admin/component/SettingWechatForm/index.jsx');
  
  var _componentSettingWechatForm2 = _interopRequireDefault(_componentSettingWechatForm);
  
  var _componentSettingAliPayForm = require('admin/component/SettingAliPayForm/index.jsx');
  
  var _componentSettingAliPayForm2 = _interopRequireDefault(_componentSettingAliPayForm);
  
  var _componentSettingModifyFormMallModifyForm = require('admin/component/SettingModifyForm/MallModifyForm.jsx');
  
  var _componentSettingModifyFormMallModifyForm2 = _interopRequireDefault(_componentSettingModifyFormMallModifyForm);
  
  var _componentSettingModifyFormCusModifyForm = require('admin/component/SettingModifyForm/CusModifyForm.jsx');
  
  var _componentSettingModifyFormCusModifyForm2 = _interopRequireDefault(_componentSettingModifyFormCusModifyForm);
  
  var _componentSettingModifyFormWechatModifyForm = require('admin/component/SettingModifyForm/WechatModifyForm.jsx');
  
  var _componentSettingModifyFormWechatModifyForm2 = _interopRequireDefault(_componentSettingModifyFormWechatModifyForm);
  
  var _storeMallAction = require('admin/store/mall/action');
  
  var mallAction = _interopRequireWildcard(_storeMallAction);
  
  var _storeCustomerAction = require('admin/store/customer/action');
  
  var customerAction = _interopRequireWildcard(_storeCustomerAction);
  
  var SettingIndex = (function (_PageBase) {
      _inherits(SettingIndex, _PageBase);
  
      function SettingIndex(props) {
          var _this = this;
  
          _classCallCheck(this, _SettingIndex);
  
          _get(Object.getPrototypeOf(_SettingIndex.prototype), 'constructor', this).call(this, props);
          this.state = {
              data: {},
              dataMall: {},
              currentData: {},
              type: 'init'
          };
  
          this.showMallModify = function (data) {
              _this.setState({
                  type: 'showMallModify',
                  currentData: data
              });
          };
  
          this.showCusModify = function (data) {
              _this.setState({
                  type: 'showCusModify',
                  currentData: data
              });
          };
  
          this.showCustomerModify = function (data) {
              _this.setState({
                  type: 'showCustomerModify',
                  currentData: data
              });
          };
  
          this.showAliPay = function (data) {
              _this.setState({
                  type: 'showAliPay',
                  currentData: data
              });
          };
  
          this.showWechat = function (data) {
              _this.setState({
                  type: 'showWechat',
                  currentData: data
              });
          };
  
          this.showUnionpay = function (data) {
              _this.setState({
                  type: 'showUnionpay',
                  currentData: data
              });
          };
  
          this.mallModify = function (data) {
              _this.props.actions.updateMallBasic(data);
          };
  
          this.cusModify = function (data) {
              _this.props.actions.updateMallCustomer(data);
          };
  
          this.updateAliPay = function (para) {
              _this.props.actions.updateCustomerAlipay(_this.state.data.id, para);
          };
  
          this.updateWechat = function (para) {
  
              _this.props.actions.updateCustomerWechat(_this.state.data.id, para);
          };
  
          this.updateUnionpay = function (data) {
              _this.props.actions.updateCustomerUnionpay(data);
          };
  
          this.reset = function () {
              _this.setState({
                  type: 'init'
              });
          };
  
          this.getIntegralExchange = function () {
              _this.props.actions.getIntegralExchange();
          };
  
          this.updateIntegralExchange = function (data) {
              var submitData = {
                  id: _this.state.data.id,
                  para: data
              };
  
              _this.props.actions.updateIntegralExchange(submitData);
          };
      }
  
      // 修改成功提示信息
  
      _createClass(SettingIndex, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
              this.props.actions.getAdminCustomer();
              this.props.actions.getMallBasic();
              this.props.actions.getIntegralExchange();
          }
  
          // 异步请求回调
          // 根据返回的nextProps.product.status处理回调
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              var operation = nextProps.operation;
  
              if (!operation.success) {
                  return;
              }
  
              switch (operation.type) {
                  // 获取商城信息
                  case mallAction.GET_MALL_BASIC:
                      this.setState({
                          type: 'loaded',
                          dataMall: nextProps.mall.mallBasic
                      });
                      break;
  
                  // 获取获取客户信息
                  case customerAction.GET_ADMIN_CUSTOMER:
                      this.setState({
                          type: 'loaded',
                          data: nextProps.customer.customerInfo
                      });
                      break;
  
                  // 获取客户积分兑换信息
                  case customerAction.GET_INTEGRAL_EXCHANGE:
                      this.setState({
                          type: 'integral',
                          dataIntegral: nextProps.customer.integral
                      });
                      break;
  
                  // 修改商城基本信息
                  case mallAction.UPDATE_MALL_BASIC:
                      modifySuccess();
                      this.props.actions.getMallBasic();
                      break;
  
                  // 修改客服
                  case mallAction.UPDATE_MALL_CUSTOMER:
                      modifySuccess();
                      this.props.actions.getMallBasic();
                      break;
  
                  // 修改客户
                  case customerAction.UPDATE_ADMIN_CUSTOMER:
                      modifySuccess();
                      this.props.actions.getAdminCustomer();
                      break;
  
                  // 修改支付宝
                  case customerAction.UPDATE_CUSTOMER_ALIPAY:
                      modifySuccess();
                      this.props.actions.getAdminCustomer();
                      break;
  
                  // 修改微信
                  case customerAction.UPDATE_CUSTOMER_WECHAT:
                      modifySuccess();
                      this.props.actions.getAdminCustomer();
                      break;
  
                  // 修改银联
                  case customerAction.UPDATE_CUSTOMER_UNIONPAY:
                      modifySuccess();
                      this.props.actions.getAdminCustomer();
                      break;
  
                  // 修改客户积分设置
                  case customerAction.UPDATE_INTEGRAL_EXCHANGE:
                      modifySuccess();
                      this.setState({
                          type: 'integral',
                          dataIntegral: nextProps.customer.integral
                      });
                      this.props.actions.getIntegralExchange();
                      break;
              }
          }
  
          // 显示商城基本设置修改弹出层
      }, {
          key: 'render',
          value: function render() {
  
              var data = this.state.data;
              var dataMall = this.state.dataMall || true;
              var dataIntegral = this.state.dataIntegral;
  
              if (data && dataMall) {
                  return _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          _antd.Card,
                          { title: '客户基础设置' },
                          _react2['default'].createElement(_componentSettingCard2['default'], {
                              reset: this.reset,
                              data: data,
                              dataMall: dataMall,
                              dataIntegral: dataIntegral,
                              updateAliPay: this.updateAliPay,
                              updateWechat: this.updateWechat,
                              showMallModify: this.showMallModify,
                              showCusModify: this.showCusModify,
                              showCustomerModify: this.showCustomerModify,
                              showAliPay: this.showAliPay,
                              showWechat: this.showWechat,
                              showUnionpay: this.showUnionpay,
                              updateIntegralExchange: this.updateIntegralExchange,
                              mallModify: this.mallModify })
                      ),
                      _react2['default'].createElement(_componentSettingModifyFormMallModifyForm2['default'], {
                          type: this.state.type,
                          data: dataMall,
                          currentData: this.state.currentData,
                          reset: this.reset,
                          mallModify: this.mallModify }),
                      _react2['default'].createElement(_componentSettingModifyFormWechatModifyForm2['default'], {
                          type: this.state.type,
                          data: data,
                          currentData: this.state.currentData,
                          reset: this.reset,
                          updateWechat: this.updateWechat }),
                      _react2['default'].createElement(_componentSettingModifyFormCusModifyForm2['default'], {
                          type: this.state.type,
                          data: dataMall,
                          currentData: this.state.currentData,
                          reset: this.reset,
                          cusModify: this.cusModify }),
                      _react2['default'].createElement(_componentSettingAliPayForm2['default'], {
                          type: this.state.type,
                          data: data,
                          reset: this.reset,
                          updateAliPay: this.updateAliPay }),
                      _react2['default'].createElement(_componentSettingWechatForm2['default'], {
                          type: this.state.type,
                          data: data,
                          reset: this.reset,
                          updateWechat: this.updateWechat })
                  );
              } else {
                  return null;
              }
          }
      }]);
  
      var _SettingIndex = SettingIndex;
      SettingIndex = (0, _reactRedux.connect)(function (state) {
          return {
              mall: state.mall.toJS(),
              customer: state.customer.toJS(),
              operation: state.operation
          };
      }, function (dispatch) {
          return {
              actions: (0, _redux.bindActionCreators)(_extends({}, mallAction, customerAction), dispatch)
          };
      })(SettingIndex) || SettingIndex;
      return SettingIndex;
  })(_commonBasePageBase2['default']);
  
  exports['default'] = SettingIndex;
  var modifySuccess = function modifySuccess() {
      _antd.message.success('修改成功!');
  };
  module.exports = exports['default'];
  
  // 显示客服基本设置修改弹出层
  
  // 显示客户基本设置修改弹出层
  
  // 显示支付宝弹出层
  
  // 显示微信弹出层
  
  // 显示银联弹出层
  
  // 修改商城基本信息
  
  // 修改客户基本信息
  
  // 修改支付宝
  
  // 修改微信
  
  // 修改银联
  
  // 重置type
  
  //获取客户积分设置
  
  //修改客户积分设置

});
