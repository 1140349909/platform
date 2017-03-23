define('admin/component/ProductBasic/basic.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var FormItem = _antd.Form.Item;
  
  // 商品基本信息
  
  var ProductBasicInfo = (function (_Component) {
      _inherits(ProductBasicInfo, _Component);
  
      function ProductBasicInfo() {
          _classCallCheck(this, ProductBasicInfo);
  
          _get(Object.getPrototypeOf(ProductBasicInfo.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 商品封面图
  
      _createClass(ProductBasicInfo, [{
          key: 'render',
          value: function render() {
              var getFieldProps = this.props.form.getFieldProps;
  
              var codeProps = getFieldProps('code', {
                  rules: [{ required: true, message: '请填写商品编号' }, { max: 20, message: '商品编号，只可输入20个汉字' }]
              });
  
              var titleProps = getFieldProps('title', {
                  rules: [{ required: true, message: '请填写商品名称' }, { max: 20, message: '商品产品，只可输入20个汉字' }]
              });
  
              var costProps = getFieldProps('cost', {
                  rules: [{ required: true, message: '请填写成本价格', type: 'number' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 3 },
                  wrapperCol: { span: 12 }
              };
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-basic-info' },
                  _react2['default'].createElement(
                      'h2',
                      null,
                      '商品基本信息'
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '商品编号'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.Input, _extends({
                          placeholder: '商品编号，只可输入20个汉字'
                      }, codeProps))
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '商品名称'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.Input, _extends({
                          placeholder: '商品名称，只可输入20个汉字'
                      }, titleProps))
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '成本价格'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.InputNumber, _extends({
                          placeholder: '请填写成本',
                          min: 0,
                          step: 0.001
                      }, costProps)),
                      '元'
                  ),
                  _react2['default'].createElement(ProductBasicUpload, {
                      readOnly: this.props.readOnly,
                      data: this.props.data,
                      form: this.props.form })
              );
          }
      }]);
  
      return ProductBasicInfo;
  })(_react.Component);
  
  exports['default'] = ProductBasicInfo;
  
  var ProductBasicUpload = (function (_Component2) {
      _inherits(ProductBasicUpload, _Component2);
  
      function ProductBasicUpload() {
          var _this = this;
  
          _classCallCheck(this, ProductBasicUpload);
  
          _get(Object.getPrototypeOf(ProductBasicUpload.prototype), 'constructor', this).apply(this, arguments);
  
          this.state = {
              // 图片Id
              productImgId: false,
  
              // 图片状态 not | pending | upload
              productImgIdState: 'not'
          };
  
          this.loadProductImg = function () {
              var data = arguments.length <= 0 || arguments[0] === undefined ? _this.props.data : arguments[0];
  
              if (!data) {
                  return;
              }
  
              if (data.productImgId == undefined) {
                  return;
              }
  
              var productVal = _this.props.form.getFieldsValue().productImgId.file.response;
  
              if (productVal == undefined) {
                  return;
              }
  
              _this.setState({
                  productImgIdState: 'upload',
                  productImgId: productVal.data
              });
          };
  
          this.onProductChange = function (info) {
  
              // 图片上传状态改变
              if (_this.state.productImgIdState == 'not' || _this.state.productImgIdState == 'upload') {
                  _this.setState({
                      productImgIdState: 'pending'
                  });
              }
  
              if (info.file.status === 'done') {
                  if (info.file.response.errCode === 0) {
                      _this.setState({
                          productImgId: info.file.response.data,
                          productImgIdState: 'upload'
                      });
                  }
              }
          };
      }
  
      _createClass(ProductBasicUpload, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.loadProductImg();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              this.loadProductImg(nextProps.data);
          }
  
          // 封面图片载入处理功能
      }, {
          key: 'render',
          value: function render() {
              var getFieldProps = this.props.form.getFieldProps;
  
              var props = {
                  name: 'media',
                  showUploadList: false,
                  withCredentials: true,
                  action: _commonUtilMedia2['default'].upLoad
              };
  
              var productImgIdProps = getFieldProps('productImgId', {
                  onChange: this.onProductChange,
                  rules: [{ required: true, message: '需要上传一张商品图片', type: 'object' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 3 },
                  wrapperCol: { span: 12 }
              };
  
              return _react2['default'].createElement(
                  FormItem,
                  _extends({
                      label: '商品缩略图'
                  }, formItemLayout),
                  _react2['default'].createElement(
                      'div',
                      { className: 'product-basic-uploadbox' },
                      _react2['default'].createElement(
                          _antd.Upload,
                          _extends({
                              className: 'product-basic-upload'
                          }, props, productImgIdProps),
                          this.state.productImgIdState == 'upload' && _react2['default'].createElement('img', {
                              className: 'product-basic-uploadimg',
                              src: _commonUtilMedia2['default'].getMediaUrl(this.state.productImgId) }),
                          this.state.productImgIdState == 'pending' && _react2['default'].createElement(
                              'div',
                              { className: 'product-basic-upload-pending' },
                              _react2['default'].createElement(_antd.Spin, null),
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'product-basic-upload-pendingtext' },
                                  '图片上传中...'
                              )
                          ),
                          this.state.productImgIdState == 'not' && _react2['default'].createElement(
                              'div',
                              null,
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'product-basic-upload-info' },
                                  '建议上传',
                                  _react2['default'].createElement('br', null),
                                  '200px*200px'
                              ),
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'product-basic-upload-tip' },
                                  '点击上传'
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return ProductBasicUpload;
  })(_react.Component);
  
  module.exports = exports['default'];

});
