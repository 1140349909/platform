define('admin/component/ProductBasic/trade.jsx', function(require, exports, module) {

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
  
  var FormItem = _antd.Form.Item;
  var Option = _antd.Select.Option;
  var RadioGroup = _antd.Radio.Group;
  
  // 商品交易设置
  
  var ProductBasicTrade = (function (_Component) {
      _inherits(ProductBasicTrade, _Component);
  
      function ProductBasicTrade() {
          var _this = this;
  
          _classCallCheck(this, ProductBasicTrade);
  
          _get(Object.getPrototypeOf(ProductBasicTrade.prototype), 'constructor', this).apply(this, arguments);
  
          this.state = {
              selectVal: 'cash'
          };
  
          this.tradingOnSelect = function (value) {
              _this.setState({
                  selectVal: value
              });
          };
  
          this.offsetOnchange = function (e) {
              var setFieldsValue = _this.props.form.setFieldsValue;
  
              if (e.target.checked) {
                  if (e.target.id == 'enableIntegralOffset') {
                      setFieldsValue({
                          enableCoupon: false
                      });
                  } else {
                      setFieldsValue({
                          enableIntegralOffset: false
                      });
                  }
              }
          };
  
          this.isNotZero = function (rule, value, callback) {
              if (value <= 0) {
                  callback([new Error('输入值不得小于0或等于0')]);
              } else {
                  callback();
              }
          };
      }
  
      _createClass(ProductBasicTrade, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              var data = this.props.data;
              if (data) {
                  this.setState({
                      selectVal: data.tradingSelect
                  });
              }
          }
  
          // 设置交易方式state
      }, {
          key: 'render',
          value: function render() {
              var getFieldProps = this.props.form.getFieldProps;
  
              var tradingSelectProps = getFieldProps('tradingSelect', {
                  initialValue: 'cash',
                  onChange: this.tradingOnSelect
              });
  
              var integralOffsetProps = getFieldProps('enableIntegralOffset', {
                  valuePropName: 'checked',
                  onChange: this.offsetOnchange
              });
  
              var enableCouponProps = getFieldProps('enableCoupon', {
                  valuePropName: 'checked',
                  onChange: this.offsetOnchange
              });
  
              var stockProps = getFieldProps('stock', {
                  initialValue: 1,
                  rules: [{ required: true, message: '请填写库存', type: 'number' }]
              });
  
              var limitProps = getFieldProps('limit', {});
  
              var priceProps = undefined,
                  integralProps = undefined,
                  xPriceProps = undefined,
                  xIntegralProps = undefined;
  
              if (this.state.selectVal == 'cash') {
                  priceProps = getFieldProps('price', {
                      rules: [{ required: true, message: '请填写单价', type: 'number' }, { validator: this.isNotZero }]
                  });
              }
  
              if (this.state.selectVal == 'integral') {
                  integralProps = getFieldProps('integral', {
                      rules: [{ required: true, message: '请填写积分', type: 'number' }]
                  });
              }
  
              if (this.state.selectVal == 'cashIntegral') {
                  xPriceProps = getFieldProps('xprice', {
                      rules: [{ required: true, message: '不得为空', type: 'number' }]
                  });
              }
  
              if (this.state.selectVal == 'cashIntegral') {
                  xIntegralProps = getFieldProps('xintegral', {
                      rules: [{ required: true, message: '不得为空', type: 'number' }]
                  });
              }
  
              var formItemLayout = {
                  labelCol: { span: 3 },
                  wrapperCol: { span: 19 }
              };
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-basic-trade' },
                  _react2['default'].createElement(
                      'h2',
                      null,
                      '商品交易设置'
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '交易方式'
                      }, formItemLayout),
                      _react2['default'].createElement(
                          _antd.Select,
                          _extends({
                              style: { width: '200px' }
                          }, tradingSelectProps),
                          _react2['default'].createElement(
                              Option,
                              { value: 'cash' },
                              '现金'
                          ),
                          _react2['default'].createElement(
                              Option,
                              { value: 'integral' },
                              '积分'
                          ),
                          _react2['default'].createElement(
                              Option,
                              { value: 'cashIntegral' },
                              '现金 + 积分'
                          )
                      ),
                      !this.props.payDisabled && _react2['default'].createElement(
                          'a',
                          {
                              onClick: this.props.onLink,
                              href: 'javascript:;' },
                          '  ',
                          _react2['default'].createElement(_antd.Icon, { type: 'info-circle' }),
                          '第三方支付未配置'
                      )
                  ),
                  this.state.selectVal == 'cash' && _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '交易单价'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          step: 0.001,
                          placeholder: '请填写价格'
                      }, priceProps)),
                      '元',
                      _react2['default'].createElement(
                          'div',
                          null,
                          _react2['default'].createElement(
                              _antd.Checkbox,
                              integralOffsetProps,
                              '允许积分抵现:'
                          ),
                          '按照平台 ',
                          _react2['default'].createElement(
                              'a',
                              { href: 'javascript:;', onClick: this.props.onLink },
                              _react2['default'].createElement(_antd.Icon, { type: 'info-circle' }),
                              '积分兑换比率'
                          ),
                          '，积分可以最大限度进行抵现'
                      ),
                      _react2['default'].createElement(
                          'div',
                          null,
                          _react2['default'].createElement(
                              _antd.Checkbox,
                              enableCouponProps,
                              '允许优惠券使用:'
                          ),
                          '商品可以使用优惠券'
                      )
                  ),
                  this.state.selectVal == 'integral' && _react2['default'].createElement(
                      FormItem,
                      _extends({}, formItemLayout, {
                          label: '交易单价' }),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          placeholder: '请填写积分',
                          min: 0
                      }, integralProps)),
                      ' 积分'
                  ),
                  this.state.selectVal == 'cashIntegral' && _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '交易单价'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          placeholder: '请填写价格',
                          min: 0,
                          step: 0.001
                      }, xPriceProps)),
                      '元 +  ',
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          placeholder: '请填写积分'
                      }, xIntegralProps)),
                      ' 积分'
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '上架数量'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 1
                      }, stockProps)),
                      '件    当销售完上架数量，系统会自动停售'
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '每人限购'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          min: 0,
                          placeholder: '默认不限购'
                      }, limitProps)),
                      '件    不填默认为库存数量不限'
                  )
              );
          }
      }]);
  
      return ProductBasicTrade;
  })(_react.Component);
  
  exports['default'] = ProductBasicTrade;
  module.exports = exports['default'];
  
  // 不允许积分抵现优惠券同时开启
  
  // 校验不得小于等于0

});
