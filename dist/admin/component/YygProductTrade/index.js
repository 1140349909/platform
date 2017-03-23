define('admin/component/YygProductTrade/index.jsx', function(require, exports, module) {

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
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  '';
  
  var FormItem = _antd.Form.Item;
  
  // 新增产品容器-父组件
  
  var YygProductTrade = (function (_Component) {
      _inherits(YygProductTrade, _Component);
  
      function YygProductTrade(props) {
          var _this = this;
  
          _classCallCheck(this, YygProductTrade);
  
          _get(Object.getPrototypeOf(YygProductTrade.prototype), 'constructor', this).call(this, props);
  
          this.handleSubmitClick = function () {
              var isErrors = false;
  
              // 校验
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      isErrors = true;
                      return;
                  }
              });
  
              if (!isErrors) {
                  var formData = _this.props.form.getFieldsValue();
  
                  // 判断每期开奖个数，不得超过投币次数
                  if (formData.numOfOwners > formData.credit / formData.bidStep) {
                      _antd.message.warning('每期开奖个数，不得超过投币次数');
                      return;
                  }
  
                  // 判断是否追加库存
                  if (_this.props.data.isImprove) {
                      var additionalStock = formData.additionalStock || 0;
                      formData.stock = additionalStock + _this.props.data.yygCfg.stock;
                      delete formData.additionalStock;
                  }
  
                  return {
                      cost: formData.cost * 100,
                      yygCfg: {
                          bidStep: formData.bidStep,
                          credit: formData.credit,
                          numOfOwners: formData.numOfOwners,
                          stock: formData.stock
                      }
                  };
              }
          };
  
          this.onCancel = function () {
              if (_this.props.onCancel) {
                  _this.props.onCancel();
              }
          };
  
          this.onOk = function () {
              if (_this.props.onOk) {
                  var data = _this.handleSubmitClick();
                  if (!data) return;
                  _this.props.onOk(data);
              }
          };
  
          this.onSaveSubmit = function () {
              if (_this.props.onSaveSubmit) {
                  var data = _this.handleSubmitClick();
                  if (!data) return;
                  _this.props.onSaveSubmit(data);
              }
          };
      }
  
      // 新增产品容器-父组件
  
      // 获取表单数据
  
      _createClass(YygProductTrade, [{
          key: 'render',
          value: function render() {
  
              var extra = this.props.extra ? this.props.extra : '参与规则';
  
              var footer = [];
  
              // 判断是否存在按钮回调函数，显示对应按钮
              if (this.props.onCancel) {
                  footer.push(_react2['default'].createElement(
                      _antd.Button,
                      {
                          size: 'large',
                          key: 'cancel',
                          onClick: this.onCancel },
                      '取消'
                  ));
              }
  
              if (this.props.onOk) {
                  footer.push(_react2['default'].createElement(
                      _antd.Button,
                      {
                          loading: this.props.saveLoading,
                          size: 'large',
                          type: 'primary',
                          key: 'save',
                          onClick: this.onOk },
                      '保存'
                  ));
              }
  
              if (this.props.onSaveSubmit) {
                  footer.push(_react2['default'].createElement(
                      _antd.Button,
                      {
                          loading: this.props.saveSubmitLoading,
                          size: 'large',
                          key: 'saveSubmit',
                          onClick: this.onSaveSubmit },
                      '保存并上架'
                  ));
              }
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'yyg-product-trade' },
                  _react2['default'].createElement(
                      _antd.Modal,
                      { ref: 'modal',
                          width: 700,
                          visible: this.props.visible,
                          title: extra,
                          onCancel: this.props.onCancel,
                          footer: footer },
                      _react2['default'].createElement(
                          'div',
                          { className: 'product-previewbox' },
                          _react2['default'].createElement(
                              _antd.Form,
                              null,
                              _react2['default'].createElement(YygProductTradeForm, {
                                  data: this.props.data,
                                  form: this.props.form })
                          )
                      )
                  )
              );
          }
      }]);
  
      return YygProductTrade;
  })(_react.Component);
  
  var YygProductTradeForm = (function (_Component2) {
      _inherits(YygProductTradeForm, _Component2);
  
      function YygProductTradeForm() {
          var _this2 = this;
  
          _classCallCheck(this, YygProductTradeForm);
  
          _get(Object.getPrototypeOf(YygProductTradeForm.prototype), 'constructor', this).apply(this, arguments);
  
          this.isNotZero = function (rule, value, callback) {
              if (value == 0) {
                  callback([new Error('输入值不得小于0或等于0')]);
              } else {
                  callback();
              }
          };
  
          this.checkCredit = function (rule, value, callback) {
              var validateFields = _this2.props.form.validateFields;
  
              if (value) {
                  validateFields(['bidStep'], { force: true });
              }
              callback();
          };
  
          this.checkCredit2 = function (rule, value, callback) {
              var _props$form = _this2.props.form;
              var getFieldValue = _props$form.getFieldValue;
              var getFieldsValue = _props$form.getFieldsValue;
  
              var _getFieldsValue = getFieldsValue();
  
              var credit = _getFieldsValue.credit;
              var bidStep = _getFieldsValue.bidStep;
  
              if (bidStep > credit) {
                  callback([new Error('参与基数不得大于所需总数！')]);
              } else if (credit % bidStep !== 0) {
                  callback([new Error('参与基数*参与次数，例如参与基数为10，参与次数选择20，所需币数为200；但是显示的是20，也就是参与次数的20')]);
              } else if (bidStep == 0 || credit == 0) {
                  callback([new Error('参与基数或所需总数不得为0！')]);
              } else {
                  callback();
              }
          };
      }
  
      _createClass(YygProductTradeForm, [{
          key: 'render',
          value: function render() {
              var _props$form2 = this.props.form;
              var getFieldProps = _props$form2.getFieldProps;
              var getFieldsValue = _props$form2.getFieldsValue;
  
              var formData = getFieldsValue();
              var isImprove = this.props.data.isImprove;
  
              var creditProps = getFieldProps('credit', {
                  rules: [{ required: true, message: '请填写参与基数', type: 'number' }, { validator: this.checkCredit }]
              });
  
              var costProps = getFieldProps('cost', {
                  rules: [{ required: true, message: '请填写参与基数', type: 'number' }]
              });
  
              var bidStepProps = getFieldProps('bidStep', {
                  rules: [{ required: true, message: '请填写所需总数', type: 'number' }, { validator: this.checkCredit2 }]
              });
  
              var numOfOwnersProps = getFieldProps('numOfOwners', {
                  rules: [{ required: true, message: '请填写每期开奖', type: 'number' }, { validator: this.isNotZero }]
              });
  
              var additionalStockProps = undefined,
                  stockProps = undefined;
  
              // 判断是否为追加状态
              if (isImprove) {
                  additionalStockProps = getFieldProps('additionalStock');
              } else {
                  stockProps = getFieldProps('stock', {
                      rules: [{ required: true, message: '请填写新库存量', type: 'number' }]
                  });
              }
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              var stock = typeof this.props.data.yygCfg.stock == 'undefined' ? 0 : this.props.data.yygCfg.stock - this.props.data.creditRecieved;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'yyg-product-trade-form' },
                  _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '所需总数' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          placeholder: '所需总数'
                      }, creditProps)),
                      '币',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '需用户参与的总币数，当期进行开奖'
                      )
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '参与基数' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          placeholder: '参与基数'
                      }, bidStepProps)),
                      '虚拟币',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '(1虚拟币 = 1元参与基数：用户没参与一次需要支付虚拟币数值)'
                      )
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '每期开奖' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          placeholder: '每期开奖'
                      }, numOfOwnersProps)),
                      '个',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '每期开出的奖的数量'
                      )
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '成本价' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001,
                          placeholder: '成本价'
                      }, costProps)),
                      '元',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '商品成本价'
                      )
                  ),
                  isImprove && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          help: '发布后按照新的上架数量进行交易',
                          label: '追加库存量' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          placeholder: '追加库存量'
                      }, additionalStockProps)),
                      '件',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '现库存余量',
                          this.props.data.intensity,
                          '件'
                      )
                  ),
                  !isImprove && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          help: '发布后按照新的上架数量进行交易',
                          label: '新库存量' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 1,
                          placeholder: '新库存量'
                      }, stockProps)),
                      '件',
                      _react2['default'].createElement(
                          'span',
                          { className: 'yyg-product-trade-help' },
                          '现库存余量',
                          this.props.data.intensity,
                          '件'
                      )
                  )
              );
          }
      }]);
  
      return YygProductTradeForm;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          var yygCfg = data.yygCfg;
  
          if (!data) {
              return {};
          }
  
          var cost = data.cost / 100,
              credit = yygCfg.credit,
              bidStep = 0;
  
          if (bidStep == 0) {
              bidStep = 1;
          }
  
          return {
              cost: {
                  value: cost
              },
              bidStep: {
                  value: bidStep
              },
              credit: {
                  value: credit
              },
              numOfOwners: {
                  value: yygCfg.numOfOwners
              }
          };
      }
  })(YygProductTrade);
  module.exports = exports['default'];
  
  // 取消
  
  // 保存
  
  // 保存并提交
  
  // 校验不得小于等于0

});
