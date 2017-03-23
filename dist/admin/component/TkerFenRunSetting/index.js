define('admin/component/TkerFenRunSetting/index.jsx', function(require, exports, module) {

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
  
  var _commonUtil = require('common/util/index');
  
  '';
  
  var FormItem = _antd.Form.Item;
  var Option = _antd.Select.Option;
  
  var TkerFenRunSetting = (function (_Component) {
      _inherits(TkerFenRunSetting, _Component);
  
      function TkerFenRunSetting(props) {
          var _this = this;
  
          _classCallCheck(this, TkerFenRunSetting);
  
          _get(Object.getPrototypeOf(TkerFenRunSetting.prototype), 'constructor', this).call(this, props);
          this.state = {
              imgState: 0,
              levelDisabled: true
          };
  
          this.handelComponent = function () {
              var data = _this.props.data;
  
              if (data == null) {
                  _this.setState({
                      levelDisabled: false
                  });
              } else {
                  _this.setState({
                      imgState: data.level
                  });
              }
          };
  
          this.handelSubmit = function () {
              var formData = _this.props.form.getFieldsValue(),
                  data = {},
                  total = 0,
                  isErrors = false;
  
              _this.props.form.validateFields(function (errors, values) {
                  if (errors) {
                      isErrors = true;
                      return;
                  }
              });
  
              data = {
                  level: formData.level,
                  lv0ProfitRate: formData.lv0ProfitRate,
                  lv1ProfitRate: formData.lv1ProfitRate,
                  lv2ProfitRate: formData.lv2ProfitRate,
                  lv3ProfitRate: formData.lv3ProfitRate
              };
  
              // 分润率不得高于上级 && 总分润比不得超过100%校验
              if (_this.state.imgState == 0) {
                  total = data.lv0ProfitRate;
                  delete data.lv1ProfitRate;
                  delete data.lv2ProfitRate;
                  delete data.lv3ProfitRate;
              } else if (_this.state.imgState == 1) {
                  if (data.lv0ProfitRate < data.lv1ProfitRate) {
                      _antd.message.warning('下级分润率不得大于上级分润率');
                      return false;
                  }
                  total = data.lv0ProfitRate + data.lv1ProfitRate;
                  delete data.lv2ProfitRate;
                  delete data.lv3ProfitRate;
              } else if (_this.state.imgState == 2) {
                  if (data.lv0ProfitRate < data.lv1ProfitRate || data.lv1ProfitRate < data.lv2ProfitRate) {
                      _antd.message.warning('下级分润率不得大于上级分润率');
                      return false;
                  }
                  total = data.lv0ProfitRate + data.lv1ProfitRate + data.lv2ProfitRate;
                  delete data.lv3ProfitRate;
              } else {
                  if (data.lv0ProfitRate < data.lv1ProfitRate || data.lv1ProfitRate < data.lv2ProfitRate || data.lv2ProfitRate < data.lv3ProfitRate) {
                      _antd.message.warning('下级分润率不得大于上级分润率');
                      return false;
                  }
                  total = data.lv0ProfitRate + data.lv1ProfitRate + data.lv2ProfitRate + data.lv3ProfitRate;
              }
  
              if (total > 100) {
                  _antd.message.warning('总分润比不得超过100%');
                  return false;
              }
  
              if (!isErrors) {
                  return data;
              }
          };
  
          this.onSave = function () {
              var formData = _this.handelSubmit();
              if (!formData) return;
              _this.props.onSave(formData);
          };
  
          this.onReturn = function () {
              if (!_this.props.onReturn) {
                  _this.props.onCancel();
              } else {
                  _this.props.onReturn();
              }
          };
  
          this.handelImgChange = function (imgState) {
              _this.setState({
                  imgState: imgState
              });
          };
      }
  
      _createClass(TkerFenRunSetting, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.handelComponent();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps() {
              this.handelComponent();
          }
      }, {
          key: 'render',
          value: function render() {
  
              var profit = this.props.profit || null;
  
              return _react2['default'].createElement(
                  _antd.Modal,
                  {
                      className: 'tker-fenrun-setting',
                      title: '分销分润设置',
                      visible: true,
                      width: 800,
                      onCancel: this.props.onCancel,
                      extra: '根据商品毛利润（售价成本价）比例进行分销设置',
                      footer: [_react2['default'].createElement(
                          _antd.Button,
                          {
                              key: 'cancel',
                              size: 'large',
                              onClick: this.onReturn },
                          '返回'
                      ), _react2['default'].createElement(
                          _antd.Button,
                          {
                              key: 'save',
                              size: 'large',
                              loading: this.props.loading,
                              onClick: this.onSave,
                              type: 'primary' },
                          '保存'
                      ), _react2['default'].createElement(
                          'span',
                          { key: 'large', className: 'tker-fenrun-setting-tip' },
                          '请谨慎进行分润设置，设置后，分销层级不可进行修改！'
                      )] },
                  _react2['default'].createElement(
                      'div',
                      { className: 'tker-fenrun-setting-box' },
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-fenrun-setting-form' },
                          _react2['default'].createElement(
                              _antd.Form,
                              { horizontal: true },
                              _react2['default'].createElement(SettingForm, {
                                  profit: profit,
                                  data: this.props.data,
                                  model: this.props.model,
                                  disabled: this.state.levelDisabled,
                                  imgState: this.state.imgState,
                                  handelImgChange: this.handelImgChange,
                                  form: this.props.form })
                          )
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'tker-fenrun-setting-imgs' },
                          this.state.imgState == 0 && _react2['default'].createElement('img', { src: '/admin/component/TkerFenRunSetting/img/level0.png' }),
                          this.state.imgState == 1 && _react2['default'].createElement('img', { src: '/admin/component/TkerFenRunSetting/img/level1.png' }),
                          this.state.imgState == 2 && _react2['default'].createElement('img', { src: '/admin/component/TkerFenRunSetting/img/level2.png' }),
                          this.state.imgState == 3 && _react2['default'].createElement('img', { src: '/admin/component/TkerFenRunSetting/img/level3.png' })
                      )
                  )
              );
          }
      }]);
  
      return TkerFenRunSetting;
  })(_react.Component);
  
  var SettingForm = (function (_Component2) {
      _inherits(SettingForm, _Component2);
  
      function SettingForm() {
          var _this2 = this;
  
          _classCallCheck(this, SettingForm);
  
          _get(Object.getPrototypeOf(SettingForm.prototype), 'constructor', this).apply(this, arguments);
  
          this.handelLevelSelect = function (val) {
              _this2.props.handelImgChange(val);
          };
  
          this.state = {
              lv0Profit: 0,
              lv1Profit: 0,
              lv2Profit: 0,
              lv3Profit: 0
          };
  
          this.getProfit = function (val) {
              if (_this2.props.profit == null) return '';
              return '(' + (0, _commonUtil.moneyFormat)(_this2.props.profit * (val / 100)) + '元)';
          };
      }
  
      _createClass(SettingForm, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              var data = this.props.data;
              this.state.lv0Profit = this.getProfit(data.lv0ProfitRate);
              this.state.lv1Profit = this.getProfit(data.lv1ProfitRate);
              this.state.lv2Profit = this.getProfit(data.lv2ProfitRate);
              this.state.lv3Profit = this.getProfit(data.lv3ProfitRate);
          }
  
          // 计算分润
      }, {
          key: 'render',
          value: function render() {
              var _this3 = this;
  
              var getFieldProps = this.props.form.getFieldProps;
              var imgState = this.props.imgState;
  
              var lv0ProfitRateProps = undefined,
                  lv1ProfitRateProps = undefined,
                  lv2ProfitRateProps = undefined,
                  lv3ProfitRateProps = undefined;
  
              var levelProps = getFieldProps('level', {
                  initialValue: '0',
                  onChange: this.handelLevelSelect
              });
  
              if (imgState >= 0) {
                  lv0ProfitRateProps = getFieldProps('lv0ProfitRate', {
                      rules: [{ required: true, message: '必填项', type: 'number' }],
                      onChange: function onChange(val) {
                          _this3.state.lv0Profit = _this3.getProfit(val);
                      }
                  });
              }
  
              if (imgState >= 1) {
                  lv1ProfitRateProps = getFieldProps('lv1ProfitRate', {
                      rules: [{ required: true, message: '必填项', type: 'number' }],
                      onChange: function onChange(val) {
                          _this3.state.lv1Profit = _this3.getProfit(val);
                      }
                  });
              }
  
              if (imgState >= 2) {
                  lv2ProfitRateProps = getFieldProps('lv2ProfitRate', {
                      rules: [{ required: true, message: '必填项', type: 'number' }],
                      onChange: function onChange(val) {
                          _this3.state.lv2Profit = _this3.getProfit(val);
                      }
                  });
              }
  
              if (imgState >= 3) {
                  lv3ProfitRateProps = getFieldProps('lv3ProfitRate', {
                      rules: [{ required: true, message: '必填项', type: 'number' }],
                      onChange: function onChange(val) {
                          _this3.state.lv3Profit = _this3.getProfit(val);
                      }
                  });
              }
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '选择分销等级' }),
                      _react2['default'].createElement(
                          _antd.Select,
                          _extends({}, levelProps, {
                              placeholder: '请选择颜色',
                              disabled: this.props.disabled,
                              style: { width: '150px' } }),
                          _react2['default'].createElement(
                              Option,
                              { value: '0' },
                              '佣工'
                          ),
                          _react2['default'].createElement(
                              Option,
                              { value: '1' },
                              '一级分销'
                          ),
                          _react2['default'].createElement(
                              Option,
                              { value: '2' },
                              '二级分销'
                          ),
                          _react2['default'].createElement(
                              Option,
                              { value: '3' },
                              '三级分销'
                          )
                      )
                  ),
                  imgState >= 0 && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '佣工率' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001
                      }, lv0ProfitRateProps, {
                          placeholder: '佣工率' })),
                      _react2['default'].createElement(
                          'span',
                          { className: 'ant-input-group-addon' },
                          '%'
                      ),
                      _react2['default'].createElement(
                          'span',
                          { className: 'tker-fenrun-setting-profit' },
                          this.state.lv0Profit
                      )
                  ),
                  imgState >= 1 && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '一级分润率' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001
                      }, lv1ProfitRateProps, {
                          placeholder: '一级分润率' })),
                      _react2['default'].createElement(
                          'span',
                          { className: 'ant-input-group-addon' },
                          '%'
                      ),
                      _react2['default'].createElement(
                          'span',
                          { className: 'tker-fenrun-setting-profit' },
                          this.state.lv1Profit
                      )
                  ),
                  imgState >= 2 && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '二级分润率' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001
                      }, lv2ProfitRateProps, {
                          placeholder: '二级分润率' })),
                      _react2['default'].createElement(
                          'span',
                          { className: 'ant-input-group-addon' },
                          '%'
                      ),
                      _react2['default'].createElement(
                          'span',
                          { className: 'tker-fenrun-setting-profit' },
                          this.state.lv2Profit
                      )
                  ),
                  imgState >= 3 && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '三级分润率' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001
                      }, lv3ProfitRateProps, {
                          placeholder: '三级分润率' })),
                      _react2['default'].createElement(
                          'span',
                          { className: 'ant-input-group-addon' },
                          '%'
                      ),
                      _react2['default'].createElement(
                          'span',
                          { className: 'tker-fenrun-setting-profit' },
                          this.state.lv3Profit
                      )
                  )
              );
          }
      }]);
  
      return SettingForm;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          console.log('data.level', data.level);
          if (!data) return;
          return {
              level: {
                  value: data.level.toString()
              },
              lv0ProfitRate: {
                  value: data.lv0ProfitRate
              },
              lv1ProfitRate: {
                  value: data.lv1ProfitRate
              },
              lv2ProfitRate: {
                  value: data.lv2ProfitRate
              },
              lv3ProfitRate: {
                  value: data.lv3ProfitRate
              }
  
          };
      }
  })(TkerFenRunSetting);
  module.exports = exports['default'];
  
  // 提交
  
  // 保存
  
  // 返回

});
