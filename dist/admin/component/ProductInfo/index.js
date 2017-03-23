define('admin/component/ProductInfo/index.jsx', function(require, exports, module) {

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
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _commonComponentUEditor = require('common/component/UEditor/index.jsx');
  
  '';
  
  var FormItem = _antd.Form.Item;
  var EDITOR_ID = 'contentEditor';
  
  // 新增产品容器-父组件
  
  var ProductInfo = (function (_Component) {
      _inherits(ProductInfo, _Component);
  
      function ProductInfo(props) {
          var _this = this;
  
          _classCallCheck(this, ProductInfo);
  
          _get(Object.getPrototypeOf(ProductInfo.prototype), 'constructor', this).call(this, props);
  
          this.onChange = function () {
              return _this.handleSubmitClick();
          };
  
          this.handleSubmitClick = function () {
  
              var content = (0, _commonComponentUEditor.getEditorValue)(EDITOR_ID);
              var formData = _this.props.form.getFieldsValue();
              var isErrors = false;
  
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      isErrors = true;
                      return;
                  }
              });
  
              // 图文不可为空
              if (content == "") {
                  _antd.message.warning('图文详情不可为空!');
                  return;
              }
  
              // 判断上架图片是否上传完成
              if (typeof formData.coverImgId.file.response == 'undefined') {
                  _antd.message.warning('上架首页图片，没有上传完成');
                  return;
              }
  
              // 判断图片是否存在做数据转换
              formData.bannerImgs.map(function (item, index) {
                  if (typeof item.response == 'undefined') {
                      isErrors = true;
                      _antd.message.warning('上架广告图片，没有上传完成');
                      return;
                  }
              });
  
              // 校验成功
              if (!isErrors) {
                  return _extends({}, formData, {
                      content: content
                  });
              }
          };
  
          this.handleDataConversion = function (formData) {
  
              // 上传图片数据转换
              var bannerImgs = [],
                  coverImgId = '';
  
              formData.bannerImgs.map(function (item, index) {
                  bannerImgs.push(item.response.data);
              });
  
              coverImgId = formData.coverImgId.file.response.data;
  
              return {
                  name: formData.name,
                  content: formData.content,
                  digest: formData.digest,
                  mediaRes: {
                      bannerImgs: bannerImgs,
                      coverImgId: coverImgId
                  }
              };
          };
  
          this.onCancel = function () {
              _this.props.onCancel();
          };
  
          this.onExit = function () {
              _this.props.onExit();
          };
  
          this.onPrev = function () {
              var formData = _this.handleSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onPrev(formData, dataConversion);
          };
  
          this.onOk = function () {
              var formData = _this.handleSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onOk(formData, dataConversion);
          };
  
          this.onPreview = function () {
              var formData = _this.handleSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onPreview(formData, dataConversion);
          };
  
          this.onDone = function () {
              var formData = _this.handleSubmitClick();
  
              if (!formData) return;
  
              var dataConversion = _this.handleDataConversion(formData);
  
              _this.props.onDone(formData, dataConversion);
          };
      }
  
      // 商品详情信息inputs
  
      _createClass(ProductInfo, [{
          key: 'componentDidMount',
  
          // 富文本编辑器启动·
          value: function componentDidMount() {
              if (this.props.data) {
                  (0, _commonComponentUEditor.setEditorValue)(EDITOR_ID, this.props.data.content);
              }
          }
  
          // 富文本编辑器启动
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              if (nextProps.data) {
                  (0, _commonComponentUEditor.setEditorValue)(EDITOR_ID, nextProps.data.content);
              }
          }
      }, {
          key: 'render',
          value: function render() {
  
              var formProps = {
                  form: this.props.form,
                  data: this.props.data
              };
  
              // 弹出层模式下样式变化
              var classBtnsShow = this.props.mold == 'show' ? 'product-info-btnsshow' : '';
  
              return _react2['default'].createElement(
                  'div',
                  { className: 'product-info' },
                  _react2['default'].createElement(
                      _antd.Form,
                      { horizontal: true },
                      _react2['default'].createElement(
                          'div',
                          { className: 'product-info-hd' },
                          _react2['default'].createElement(
                              'div',
                              { className: 'product-info-coverimg' },
                              _react2['default'].createElement(ProductInfoCoverImg, formProps)
                          ),
                          _react2['default'].createElement(
                              'div',
                              { className: 'product-info-bannerimg' },
                              _react2['default'].createElement(ProductInfoBannerImg, formProps)
                          )
                      ),
                      _react2['default'].createElement('div', { className: 'product-info-line' }),
                      _react2['default'].createElement(
                          'div',
                          { className: 'product-info-inputs' },
                          _react2['default'].createElement(ProductInfoInputs, _extends({
                              mold: this.props.mold
                          }, formProps))
                      ),
                      _react2['default'].createElement(
                          'div',
                          { className: 'product-info-des' },
                          _react2['default'].createElement(
                              'h2',
                              null,
                              '上架图文详情'
                          ),
                          _react2['default'].createElement(_commonComponentUEditor.Editor, { id: 'contentEditor', height: '450px' })
                      ),
                      _react2['default'].createElement(
                          'div',
                          {
                              className: 'product-info-btns ' + classBtnsShow },
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
                          this.props.onPrev && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  size: 'large',
                                  onClick: this.onPrev },
                              '上一步'
                          ),
                          this.props.onOk && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  loading: this.props.saveLoading,
                                  size: 'large',
                                  type: 'primary',
                                  onClick: this.onOk },
                              '保存'
                          ),
                          this.props.onPreview && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  loading: this.props.previewLoading,
                                  size: 'large',
                                  onClick: this.onPreview },
                              '预览'
                          ),
                          this.props.onDone && _react2['default'].createElement(
                              _antd.Button,
                              {
                                  loading: this.props.doneLoading,
                                  size: 'large',
                                  onClick: this.onDone },
                              '完成'
                          )
                      )
                  )
              );
          }
      }]);
  
      return ProductInfo;
  })(_react.Component);
  
  var ProductInfoInputs = (function (_Component2) {
      _inherits(ProductInfoInputs, _Component2);
  
      function ProductInfoInputs() {
          _classCallCheck(this, ProductInfoInputs);
  
          _get(Object.getPrototypeOf(ProductInfoInputs.prototype), 'constructor', this).apply(this, arguments);
      }
  
      // 首页图片
  
      _createClass(ProductInfoInputs, [{
          key: 'render',
          value: function render() {
              var getFieldProps = this.props.form.getFieldProps;
  
              var nameProps = getFieldProps('name', {
                  rules: [{ required: true, message: '请填写产品标题' }, { max: 20, message: '上架标题，只可输入20个汉字' }]
              });
  
              var digestProps = getFieldProps('digest', {
                  rules: [{ required: true, message: '请填写上架描述' }, { max: 50, message: '上架描述，只可输入50个汉字' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 2 },
                  wrapperCol: { span: 22 }
              };
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '上架标题'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.Input, _extends({
                          placeholder: '上架标题，只可输入20个汉字'
                      }, nameProps))
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      _extends({
                          label: '上架描述'
                      }, formItemLayout),
                      _react2['default'].createElement(_antd.Input, _extends({
                          placeholder: '上架描述，只可输入50个汉字'
                      }, digestProps))
                  )
              );
          }
      }]);
  
      return ProductInfoInputs;
  })(_react.Component);
  
  var ProductInfoCoverImg = (function (_Component3) {
      _inherits(ProductInfoCoverImg, _Component3);
  
      function ProductInfoCoverImg() {
          var _this2 = this;
  
          _classCallCheck(this, ProductInfoCoverImg);
  
          _get(Object.getPrototypeOf(ProductInfoCoverImg.prototype), 'constructor', this).apply(this, arguments);
  
          this.state = {
              // 图片Id
              coverImgId: false,
  
              // 图片状态 not | pending | upload
              coverImgIdState: 'not'
          };
  
          this.loadCoverImgId = function () {
              var data = arguments.length <= 0 || arguments[0] === undefined ? _this2.props.data : arguments[0];
  
              if (!data) {
                  return;
              }
  
              if (data.coverImgId == undefined) {
                  return;
              }
  
              var coverImgIdVal = _this2.props.form.getFieldsValue().coverImgId.file.response;
  
              if (coverImgIdVal == undefined) {
                  return;
              }
  
              _this2.setState({
                  coverImgIdState: 'upload',
                  coverImgId: coverImgIdVal.data
              });
          };
  
          this.onChange = function (info) {
  
              // 图片上传状态改变
              if (_this2.state.coverImgIdState == 'not' || _this2.state.coverImgIdState == 'upload') {
                  _this2.setState({
                      coverImgIdState: 'pending'
                  });
              }
  
              if (info.file.status === 'done') {
                  if (info.file.response.errCode === 0) {
                      _this2.setState({
                          coverImgId: info.file.response.data,
                          coverImgIdState: 'upload'
                      });
                  }
              }
          };
      }
  
      // 广告图
  
      _createClass(ProductInfoCoverImg, [{
          key: 'componentDidMount',
          value: function componentDidMount() {
              this.loadCoverImgId();
          }
      }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(nextProps) {
              this.loadCoverImgId(nextProps.data);
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
  
              var coverImgIdProps = getFieldProps('coverImgId', {
                  onChange: this.onChange,
                  rules: [{ required: true, message: '需要上传一张商品图片', type: 'object' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 2 },
                  wrapperCol: { span: 8 }
              };
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'h2',
                      null,
                      '上架首页图片'
                  ),
                  _react2['default'].createElement(
                      FormItem,
                      null,
                      _react2['default'].createElement(
                          _antd.Upload,
                          _extends({
                              className: this.state.coverImgIdState == 'upload' ? 'product-info-upload product-info-upload-success' : 'product-info-upload'
                          }, props, coverImgIdProps),
                          this.state.coverImgIdState == 'upload' && _react2['default'].createElement('img', {
                              className: 'product-info-uploadimg',
                              src: _commonUtilMedia2['default'].getMediaUrl(this.state.coverImgId) }),
                          this.state.coverImgIdState == 'pending' && _react2['default'].createElement(
                              'div',
                              { className: 'product-init-upload-pending' },
                              _react2['default'].createElement(_antd.Spin, null),
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'product-init-upload-pendingtext' },
                                  '图片上传中...'
                              )
                          ),
                          this.state.coverImgIdState == 'not' && _react2['default'].createElement(
                              'div',
                              null,
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'product-info-upload-info' },
                                  _react2['default'].createElement(_antd.Icon, { className: 'product-info-icon', type: 'picture' }),
                                  _react2['default'].createElement('br', null),
                                  _react2['default'].createElement(
                                      'p',
                                      null,
                                      '建议上传',
                                      _react2['default'].createElement('br', null),
                                      '图片大小为300px*200px'
                                  )
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return ProductInfoCoverImg;
  })(_react.Component);
  
  var ProductInfoBannerImg = (function (_Component4) {
      _inherits(ProductInfoBannerImg, _Component4);
  
      function ProductInfoBannerImg() {
          var _this3 = this;
  
          _classCallCheck(this, ProductInfoBannerImg);
  
          _get(Object.getPrototypeOf(ProductInfoBannerImg.prototype), 'constructor', this).apply(this, arguments);
  
          this.state = {
  
              // 图片信息列表
              fileList: [],
  
              // 图片缩略图弹出层状态
              priviewVisible: false,
  
              // 图片src地址
              bannerImgIdData: ''
          };
  
          this.handleCancel = function () {
              _this3.setState({
                  priviewVisible: false
              });
          };
  
          this.onChange = function (info) {
  
              // 大于5张图片,隐藏Upload
  
              var fileList = info.fileList;
              var uploadEle = document.querySelector('.product-info-bannerimg').querySelector('.ant-upload');
  
              fileList = fileList.map(function (file) {
                  if (file.response) {
                      file.url = _commonUtilMedia2['default'].getMediaUrl(file.response.data);
                  }
                  return file;
              });
  
              // banner添加框控制
              // 上传5张图时添加框消失
              // 上传4张图时添加框位置修正
              if (fileList.length == 5) {
                  uploadEle.style.display = 'none';
              } else if (fileList.length == 4) {
                  uploadEle.style.display = 'inline-block';
                  uploadEle.style.position = 'absolute';
                  uploadEle.style.top = '83px';
                  uploadEle.style.left = '148px';
              } else {
                  uploadEle.style.display = 'inline-block';
                  uploadEle.style.position = 'relative';
                  uploadEle.style.top = 0;
                  uploadEle.style.left = 0;
              }
          };
  
          this.normFile = function (e) {
              if (Array.isArray(e)) {
                  return e;
              }
              return e && e.fileList;
          };
      }
  
      _createClass(ProductInfoBannerImg, [{
          key: 'render',
          value: function render() {
              var _this4 = this;
  
              // 获取表单相关API
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              // Upload属性设置
              var props = {
                  name: 'media',
                  action: _commonUtilMedia2['default'].upLoad,
  
                  listType: 'picture-card',
                  withCredentials: true,
                  onPreview: function onPreview(file) {
                      _this4.setState({
                          bannerImgIdData: file.url,
                          priviewVisible: true
                      });
                  }
              };
  
              // Upload与表单进行双向绑定,及校验和属性设置
              var bannerImgsProps = getFieldProps('bannerImgs', {
                  valuePropName: 'fileList',
                  normalize: this.normFile,
                  onChange: this.onChange,
                  rules: [{ required: true, message: '请上传banner图,最多可上传5张', max: 6, type: 'array' }]
              });
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      'h2',
                      null,
                      '上架广告页'
                  ),
                  _react2['default'].createElement(
                      'div',
                      null,
                      _react2['default'].createElement(
                          FormItem,
                          {
                              help: '上传最多5张，格式要求为jpg\\png/gif格式,图片大小为640px*320px' },
                          _react2['default'].createElement(
                              _antd.Upload,
                              _extends({}, props, bannerImgsProps),
                              _react2['default'].createElement(_antd.Icon, { type: 'plus' }),
                              _react2['default'].createElement(
                                  'div',
                                  { className: 'ant-upload-text' },
                                  '上传照片'
                              )
                          )
                      ),
                      _react2['default'].createElement(
                          _antd.Modal,
                          { visible: this.state.priviewVisible, footer: null, onCancel: this.handleCancel.bind(this) },
                          _react2['default'].createElement('img', { alt: 'example', className: 'add-uploadbanner-img', src: this.state.bannerImgIdData })
                      )
                  )
              );
          }
      }]);
  
      return ProductInfoBannerImg;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (!data) {
              return {};
          }
  
          // 弹出层模式，数据转换
          if (props.mold == 'show') {
              data.coverImgId = {
                  file: {
                      response: {
                          data: data.mediaRes.coverImgId
                      }
                  }
              };
  
              data.bannerImgs = [];
  
              data.mediaRes.bannerImgs.map(function (item, index) {
                  data.bannerImgs[index] = {
                      uid: index,
                      name: index,
                      url: _commonUtilMedia2['default'].getMediaUrl(item),
                      thumbUrl: _commonUtilMedia2['default'].getMediaUrl(item),
                      response: {
                          data: item
                      }
                  };
              });
          }
  
          return {
              name: {
                  value: data.name
              },
              digest: {
                  value: data.digest
              },
              coverImgId: {
                  value: data.coverImgId
              },
              bannerImgs: {
                  value: data.bannerImgs
              }
          };
      }
  })(ProductInfo);
  module.exports = exports['default'];
  
  // 获取表单数据
  
  // 数据转为详情设置API可用的数据格式
  
  // 退出编辑
  
  // 保存
  
  // 上一步
  
  // 保存
  
  // 预览
  
  // 完成
  
  // 弹出层关闭处理函数
  
  // upload 改变时处理函数

});
