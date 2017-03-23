define('admin/component/SettingUnionpayForm/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  var Step = _antd.Steps.Step;
  var Dragger = _antd.Upload.Dragger;
  var FormItem = _antd.Form.Item;
  
  // 平台设置-修改弹出层表单
  
  var SettingUnionpayForm = (function (_Component) {
      _inherits(SettingUnionpayForm, _Component);
  
      function SettingUnionpayForm(props) {
          var _this = this;
  
          _classCallCheck(this, SettingUnionpayForm);
  
          _get(Object.getPrototypeOf(SettingUnionpayForm.prototype), 'constructor', this).call(this, props);
  
          this.handleSubmitClick = function () {
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  }
                  _this.props.updateWechat(_this.handleSubmit());
              });
          };
  
          this.handleSubmit = function (e) {
  
              var fieldsValue = _this.props.form.getFieldsValue();
  
              return {
                  appid: fieldsValue.appid,
                  secret: fieldsValue.secret,
                  muchId: fieldsValue.muchId,
                  muchKey: fieldsValue.muchKey,
                  useSys: false,
                  enable: true
              };
          };
      }
  
      _createClass(SettingUnionpayForm, [{
          key: 'render',
          value: function render() {
  
              // 获取表单相关API
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var visible = this.props.type === 'showWechat' ? true : false;
  
              var appidProps = getFieldProps('appid');
  
              var secretProps = getFieldProps('secret');
  
              var muchIdProps = getFieldProps('muchId');
  
              var muchKeyProps = getFieldProps('muchKey');
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              return _react2['default'].createElement(
                  _antd.Modal,
                  {
                      title: '微信设置',
                      visible: visible,
                      onCancel: this.props.reset,
                      footer: [_react2['default'].createElement(
                          _antd.Button,
                          {
                              key: 'back',
                              type: 'ghost',
                              size: 'large',
                              onClick: this.props.reset },
                          '返 回'
                      ), _react2['default'].createElement(
                          _antd.Button,
                          {
                              key: 'submit',
                              type: 'primary',
                              size: 'large',
                              onClick: this.handleSubmitClick },
                          '提 交'
                      )] },
                  _react2['default'].createElement(
                      _antd.Form,
                      { horizontal: true },
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: 'appid：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ id: 'waybill', type: 'text',
                              placeholder: '请输入appid' }, appidProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: 'app secret：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ id: 'waybill', type: 'text',
                              placeholder: '请输入app secret' }, secretProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '商城id mch_id：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ id: 'waybill', type: 'text',
                              placeholder: '请输入商城id mch_id' }, muchIdProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '商城密钥 mch_secret：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ id: 'waybill', type: 'text',
                              placeholder: '请输入商城密钥 mch_secret' }, muchKeyProps))
                      )
                  )
              );
          }
      }]);
  
      return SettingUnionpayForm;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
  
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data.weChat && data.weChat.enable) {
              return {
                  appid: {
                      value: data.weChat.appid
                  },
                  secret: {
                      value: data.weChat.secret
                  },
                  muchId: {
                      value: data.weChat.muchId
                  },
                  muchKey: {
                      value: data.weChat.muchKey
                  }
  
              };
          } else {
              return {};
          }
      }
  })(SettingUnionpayForm);
  module.exports = exports['default'];

});
