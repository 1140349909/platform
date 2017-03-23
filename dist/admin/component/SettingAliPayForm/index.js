define('admin/component/SettingAliPayForm/index.jsx', function(require, exports, module) {

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
  
  var SettingAliPayForm = (function (_Component) {
      _inherits(SettingAliPayForm, _Component);
  
      function SettingAliPayForm(props) {
          var _this = this;
  
          _classCallCheck(this, SettingAliPayForm);
  
          _get(Object.getPrototypeOf(SettingAliPayForm.prototype), 'constructor', this).call(this, props);
  
          this.handleSubmitClick = function () {
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  }
                  _this.props.updateAliPay(_this.handleSubmit());
              });
          };
  
          this.handleSubmit = function (e) {
  
              var fieldsValue = _this.props.form.getFieldsValue();
  
              return {
                  name: fieldsValue.name,
                  account: fieldsValue.account,
                  key: fieldsValue.key,
                  pid: fieldsValue.pid,
                  useSys: false,
                  enable: true
              };
          };
  
          this.handleUpload = function (info) {
              if (info.file.status !== 'uploading') {
                  console.log(info.file);
                  console.log(info.fileList);
              }
          };
  
          this.normFile = function (e) {
              if (Array.isArray(e)) {
                  return e;
              }
              return e && e.fileList;
          };
      }
  
      _createClass(SettingAliPayForm, [{
          key: 'render',
          value: function render() {
  
              var uploadAlipayCertUrl = _commonUtilMedia2['default'].getUploadCertUrl('alipay');
  
              // 获取表单相关API
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var visible = this.props.type === 'showAliPay';
  
              var pidProps = getFieldProps('pid', {
                  rules: [{ required: true, message: '必填项' }]
              });
  
              var keyProps = getFieldProps('key', {
                  rules: [{ required: true, message: '必填项' }]
              });
  
              var accountProps = getFieldProps('account', {
                  rules: [{ required: true, message: '必填项' }]
              });
  
              var nameProps = getFieldProps('name', {
                  rules: [{ required: true, message: '必填项' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              return _react2['default'].createElement(
                  _antd.Modal,
                  {
                      title: '支付宝设置',
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
                      { horizontal: true, onSubmit: this.handleSubmit.bind(this) },
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '合作身份者ID：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ type: 'text',
                              placeholder: '请输入合作身份者ID' }, pidProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '交易安全检验码：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ type: 'text',
                              placeholder: '请输入交易安全检验码' }, keyProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '商家支付宝账号：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ type: 'text',
                              placeholder: '请输入商家支付宝账号' }, accountProps))
                      ),
                      _react2['default'].createElement(
                          FormItem,
                          _extends({
                              label: '商家支付宝名称：'
                          }, formItemLayout),
                          _react2['default'].createElement(_antd.Input, _extends({ type: 'text',
                              placeholder: '请输入商家支付宝名称' }, nameProps))
                      ),
                      _react2['default'].createElement(
                          'a',
                          null,
                          '如何查找相关资料？'
                      )
                  )
              );
          }
      }]);
  
      return SettingAliPayForm;
  })(_react.Component);
  
  exports['default'] = SettingAliPayForm;
  exports['default'] = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data.aliPay && data.aliPay.enable) {
              return {
                  pid: {
                      value: data.aliPay.pid
                  },
                  key: {
                      value: data.aliPay.key
                  },
                  account: {
                      value: data.aliPay.account
                  },
                  name: {
                      value: data.aliPay.name
                  }
  
              };
          } else {
              return {};
          }
      }
  })(SettingAliPayForm);
  module.exports = exports['default'];
  /*需要增加支付证书上传*/ /*<FormItem
                    label="支付宝支付证书："
                    help="文件名为***，从支付宝商城下载获取"
                    {...formItemLayout}>
                    <Upload name="media"
                            action={uploadAlipayCertUrl}
                            onChange={this.handleUpload}
                            {...getFieldProps('upload', {
                                valuePropName: 'fileList',
                                normalize: this.normFile,
                            })}>
                        <Button type="ghost">
                            <Icon type="upload"/> 点击上传
                        </Button>
                    </Upload>
                 </FormItem>*/

});
