define('admin/component/ProductBasic/index.jsx', function(require, exports, module) {

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
  
  var _basic = require('admin/component/ProductBasic/basic.jsx');
  
  var _basic2 = _interopRequireDefault(_basic);
  
  var _trade = require('admin/component/ProductBasic/trade.jsx');
  
  var _trade2 = _interopRequireDefault(_trade);
  
  var _lodash = require('node_modules/lodash/lodash');
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  // 新增产品容器-父组件
  
  var ProductBasic = (function (_Component) {
      _inherits(ProductBasic, _Component);
  
      function ProductBasic(props) {
          var _this = this;
  
          _classCallCheck(this, ProductBasic);
  
          _get(Object.getPrototypeOf(ProductBasic.prototype), 'constructor', this).call(this, props);
  
          this.handelSubmitClick = function () {
              var isErrors = false;
              var formData = _this.props.form.getFieldsValue();
  
              // 校验
              _this.props.form.validateFields(function (errors, values) {
                  if (errors) {
                      isErrors = true;
                      return;
                  }
              });
  
              // 成本价不可大于交易单价
              if (formData.tradingSelect == 'cash') {
                  if (formData.cost > formData.price) {
                      _antd.message.warning('成本价格，不可大于交易单价');
                      return;
                  }
              }
  
              // 判断上传图片上否存在
              if (formData.productImgId) {
                  if (typeof formData.productImgId.file.response == 'undefined') {
                      _antd.message.warning('图片没有上传完成');
                      return;
                  }
              } else {
                  _antd.message.warning('图片没有上传完成');
                  return;
              }
  
              if (!isErrors) {
                  return formData;
              }
          };
  
          this.onNext = function () {
              var formData = _this.handelSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onNext(formData, dataConversion);
          };
  
          this.onSave = function () {
              var formData = _this.handelSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onSave(formData, dataConversion);
          };
  
          this.onSaveOpening = function () {
              var formData = _this.handelSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onSaveOpening(formData, dataConversion);
          };
  
          this.onCancel = function () {
              _this.props.onCancel();
          };
  
          this.onExit = function () {
              _this.props.onExit();
          };
  
          this.handleDataConversion = function (formData) {
              var productImgId = '';
  
              productImgId = formData.productImgId.file.response.data;
  
              var data = {
                  title: formData.title,
                  code: formData.code,
                  cost: formData.cost,
                  mediaRes: {
                      productImgId: productImgId
                  },
                  mallCfg: {
                      enableCash: false,
                      enableCoupon: false,
                      enableIntegral: false,
                      enableIntegralCash: false,
                      enableIntegralOffset: false,
                      limit: formData.limit || 0,
                      stock: formData.stock
                  }
              };
  
              // 判断交易方式，赋于对应的值
              switch (formData.tradingSelect) {
                  case 'cash':
                      data.mallCfg.enableCash = true;
                      data.mallCfg.price = formData.price;
                      data.mallCfg.enableCoupon = formData.enableCoupon || false;
                      data.mallCfg.enableIntegralOffset = formData.enableIntegralOffset || false;
                      break;
  
                  case 'integral':
                      data.mallCfg.enableIntegral = true;
                      data.mallCfg.integral = formData.integral;
                      break;
  
                  case 'cashIntegral':
                      data.mallCfg.enableIntegralCash = true;
                      data.mallCfg.price = formData.xprice;
                      data.mallCfg.integral = formData.xintegral;
                      break;
              }
  
              // 元转为分
              data.mallCfg.price = data.mallCfg.price * 100;
              data.cost = data.cost * 100;
  
              return data;
          };
      }
  
      // 获取表单数据
  
      _createClass(ProductBasic, [{
          key: 'render',
          value: function render() {
              var propsData = {
                  form: this.props.form,
                  data: this.props.data
              };
  
              // 弹出层模式下样式变化
              var classBasicShow = this.props.mold == 'show' ? 'product-basicshow' : '';
              var classBtnsShow = this.props.mold == 'show' ? 'product-basic-btnshow' : '';
              var onLink = this.props.onLink || null;
              var readOnly = this.props.readOnly;
              var payDisabled = this.props.payDisabled || false;
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-basic ' + classBasicShow },
                  _react2['default'].createElement(
                      _antd.Form,
                      { horizontal: true },
                      _react2['default'].createElement(_basic2['default'], _extends({
                          readOnly: readOnly
                      }, propsData)),
                      _react2['default'].createElement('div', { className: 'product-basic-line' }),
                      _react2['default'].createElement(_trade2['default'], _extends({
                          onLink: onLink,
                          payDisabled: payDisabled,
                          readOnly: readOnly
                      }, propsData)),
                      _react2['default'].createElement(
                          'div',
                          { className: 'product-basic-btns ' + classBtnsShow },
                          this.props.onCancel && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  size: 'large',
                                  onClick: this.onCancel },
                              '退出编辑'
                          ),
                          this.props.onExit && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  size: 'large',
                                  onClick: this.onExit },
                              '取消'
                          ),
                          this.props.onNext && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  size: 'large',
                                  type: 'primary',
                                  onClick: this.onNext },
                              '下一步'
                          ),
                          this.props.onSave && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  loading: this.props.saveLoading,
                                  size: 'large',
                                  type: 'primary',
                                  onClick: this.onSave },
                              '保存'
                          ),
                          this.props.onSaveOpening && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  loading: this.props.saveOpeningLoading,
                                  size: 'large',
                                  onClick: this.onSaveOpening },
                              '保存并上架'
                          )
                      )
                  )
              );
          }
      }]);
  
      return ProductBasic;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (!data) {
              return {};
          }
  
          // 弹出层时，数据转换
          if (props.mold == 'show') {
  
              var mallCfg = data.mallCfg;
  
              if (_lodash2['default'].has(data, 'mediaRes.productImgId')) {
                  // 商品封面图
                  data.productImgId = {
                      file: {
                          response: {
                              data: data.mediaRes.productImgId
                          }
                      }
                  };
              }
  
              data.price = '';
              data.integral = '';
              data.xprice = '';
              data.xintegral = '';
  
              // 现金
              if (mallCfg.enableCash) {
                  data.tradingSelect = 'cash';
                  data.price = mallCfg.price;
  
                  // 允许优惠券
                  if (mallCfg.enableCoupon) {
                      data.enableCoupon = true;
  
                      // 允许积分抵现
                  } else if (mallCfg.enableIntegralOffset) {
                          data.enableIntegralOffset = true;
                      }
  
                  // 积分
              } else if (mallCfg.enableIntegral) {
                      data.tradingSelect = 'integral';
                      data.integral = mallCfg.integral;
  
                      // 现金+积分
                  } else if (mallCfg.enableIntegralCash) {
                          data.tradingSelect = 'cashIntegral';
                          data.xprice = mallCfg.price;
                          data.xintegral = mallCfg.integral;
                      }
  
              data.stock = mallCfg.stock;
              data.limit = mallCfg.limit;
  
              // 分转为元
              data.price = data.price / 100;
              data.xprice = data.xprice / 100;
              data.cost = data.cost / 100;
          }
  
          return {
              code: {
                  value: data.code
              },
              title: {
                  value: data.title
              },
              cost: {
                  value: data.cost
              },
              productImgId: {
                  value: data.productImgId
              },
              tradingSelect: {
                  value: data.tradingSelect
              },
              enableIntegralOffset: {
                  value: data.enableIntegralOffset
              },
              enableCoupon: {
                  value: data.enableCoupon
              },
              price: {
                  value: data.price
              },
              integral: {
                  value: data.integral
              },
              xprice: {
                  value: data.xprice
              },
              xintegral: {
                  value: data.xintegral
              },
              stock: {
                  value: data.stock
              },
              limit: {
                  value: data.limit
              }
          };
      }
  })(ProductBasic);
  module.exports = exports['default'];
  
  // 下一步
  
  // 保存
  
  // 保存并上架
  
  // 退出
  
  // 取消
  
  // 数据转为详情设置API可用的数据格式

});
