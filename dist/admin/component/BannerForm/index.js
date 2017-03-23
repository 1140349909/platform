define('admin/component/BannerForm/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  var RadioButton = _antd.Radio.Button;
  var RadioGroup = _antd.Radio.Group;
  var Option = _antd.Select.Option;
  
  // let uuid = 0;
  /*封装模态框类，与表单配合使用*/
  
  var BannerForm = (function (_Component) {
      _inherits(BannerForm, _Component);
  
      function BannerForm(props) {
          var _this = this;
  
          _classCallCheck(this, BannerForm);
  
          _get(Object.getPrototypeOf(BannerForm.prototype), "constructor", this).call(this, props);
          this.state = {
              // 图片信息列表
              fileList: [],
  
              // 图片src地址
              bannerImgIdData: '',
  
              // 图片缩略图弹出层状态
              previewVisible: false,
              previewImage: ''
          };
  
          this.handleSubmit = function () {
  
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      //console.log.log('Errors in form!!!');
                      return;
                  } else {
                      //const formData = this.props.form.getFieldsValue();
  
                      //console.log(values);
  
                      var bannerList = [];
  
                      for (var k = 0; k < values.banners.length; k++) {
                          bannerList.push(values.banners[k].submitData);
                      }
  
                      var formData = {
                          banners: bannerList
                      };
  
                      //console.log(formData);
  
                      // 验证
                      _this.props.updateManagerBanner(_this.props.buyType, formData);
                  }
              });
          };
  
          this.normFile = function (e) {
              if (Array.isArray(e)) {
                  return e;
              }
              return e && e.fileList;
          };
  
          this.handleCancel = function () {
              _this.setState({
                  previewVisible: false
              });
          };
  
          this.render = function () {
              var data = _this.props.data;
  
              if (!data) {
                  return null;
              }
  
              /*表单相应设置*/
              //console.log(data);
  
              var _props$form = _this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldValue = _props$form.getFieldValue;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              /*移植代码*/
  
              // Upload属性设置
              var props = {
                  name: 'media',
                  action: _commonUtilMedia2["default"].upLoadBanner,
                  listType: 'picture-card',
                  withCredentials: true,
                  onPreview: function onPreview(file) {
  
                      //console.log.log(file);
  
                      _this.setState({
                          bannerSetting: file.submitData,
                          bannerImgIdData: file.url,
                          previewVisible: true
                      });
                  },
                  beforeUpload: function beforeUpload(file) {
  
                      //console.log.log(file.type);
  
                      var isJPG = file.type === 'image/jpeg';
                      var isPNG = file.type === 'image/gif';
                      var isGIF = file.type === 'image/png';
  
                      if (!isJPG && !isGIF && !isPNG) {
                          _antd.message.error('只支持 JPG/GIF/PNG 文件哦！');
                      }
                      return isJPG || isGIF || isPNG;
                  }
              };
  
              // Upload与表单进行双向绑定,及校验和属性设置
              var bannerImgsProps = getFieldProps('banners', {
                  valuePropName: 'fileList',
                  normalize: _this.normFile,
                  onChange: _this.onChange,
                  rules: [{
                      required: true,
                      message: '请上传banner图,最多可上传5张',
                      max: 6,
                      type: 'array'
                  }]
              });
  
              // 表单验证及属性相关设置
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      "div",
                      { style: { 'margin': '0 auto' } },
                      _react2["default"].createElement(
                          _antd.Form,
                          { inline: true },
                          _react2["default"].createElement(
                              "div",
                              { style: { 'margin': '16px 80px' }, className: "ant-fix" },
                              _react2["default"].createElement(
                                  FormItem,
                                  {
                                      label: "图片：",
                                      help: "建议图片尺寸640*320" },
                                  _react2["default"].createElement(
                                      _antd.Upload,
                                      _extends({}, props, bannerImgsProps),
                                      data.banners.length != 5 && _react2["default"].createElement(
                                          "div",
                                          null,
                                          _react2["default"].createElement(_antd.Icon, { type: "plus" }),
                                          _react2["default"].createElement(
                                              "div",
                                              { className: "ant-upload-text" },
                                              "上传图片"
                                          )
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              "div",
                              { style: { 'margin': '16px 0 0 128px' } },
                              _react2["default"].createElement(
                                  FormItem,
                                  null,
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      { type: "primary", onClick: _this.handleSubmit },
                                      "提交"
                                  )
                              )
                          )
                      )
                  ),
                  _react2["default"].createElement("br", null),
                  _react2["default"].createElement(PreviewForm, {
                      src: _this.state.bannerImgIdData,
                      banner: _this.state.bannerSetting
                  })
              );
          };
      }
  
      _createClass(BannerForm, [{
          key: "onChange",
  
          // upload 改变时处理函数
          value: function onChange(info) {
  
              // 大于5张图片,隐藏Upload
  
              //console.log.log(info);
  
              var fileList = info.fileList;
  
              fileList = fileList.map(function (file) {
  
                  if (!file.submitData && file.status == 'done') {
                      file.submitData = {
                          mediaId: file.response.data,
                          seq: fileList.length - 1,
                          title: '',
                          url: ''
                      };
                  }
  
                  if (file.response) {
                      file.url = _commonUtilMedia2["default"].getMediaUrl(file.response.data);
                  }
                  return file;
              });
          }
      }]);
  
      return BannerForm;
  })(_react.Component);
  
  exports["default"] = createForm({
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data) {
              var _ret = (function () {
  
                  // 转换为banner图可识别的数据格式
                  var bannersList = [];
  
                  data.banners.map(function (item, index) {
                      bannersList[index] = {
                          uid: index,
                          name: index,
                          url: _commonUtilMedia2["default"].getMediaUrl(item.mediaId),
                          thumbUrl: _commonUtilMedia2["default"].getMediaUrl(item.mediaId),
                          response: {
                              data: item.mediaId
                          },
                          submitData: {
                              mediaId: item.mediaId,
                              title: item.title,
                              url: item.url,
                              seq: item.seq
                          }
                      };
                  });
  
                  //console.log(bannersList);
  
                  return {
                      v: {
                          banners: {
                              value: bannersList
                          }
  
                      }
                  };
              })();
  
              if (typeof _ret === "object") return _ret.v;
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {
  
          //console.log.log(props, fields);
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
  
              props.data[key] = fields[key].value;
          });
      }
  })(BannerForm);
  
  // 直接预览型
  
  var PreviewForm = (function (_Component2) {
      _inherits(PreviewForm, _Component2);
  
      function PreviewForm() {
          var _this2 = this;
  
          _classCallCheck(this, PreviewForm);
  
          _get(Object.getPrototypeOf(PreviewForm.prototype), "constructor", this).apply(this, arguments);
  
          this.handleSubmit = function () {
              //console.log.log(this.props.form.getFieldsValue());
              //
              _this2.props.onCancel();
          };
      }
  
      _createClass(PreviewForm, [{
          key: "render",
          value: function render() {
  
              //console.log.log(this.props);
  
              var getFieldProps = this.props.form.getFieldProps;
  
              var formItemLayout = {};
  
              return _react2["default"].createElement(
                  "div",
                  { style: { 'margin': '0 auto' } },
                  _react2["default"].createElement(
                      _antd.Form,
                      { horizontal: true },
                      _react2["default"].createElement(
                          "div",
                          { style: { 'margin': '16px 80px' }, className: "ant-fix" },
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "标题" }),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('title', {}), { type: "text", autoComplete: "off", style: { 'width': 200 } }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "链接" }),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('url', {}), { type: "url", autoComplete: "off", style: { 'width': 200 } }))
                          )
                      )
                  )
              );
          }
      }]);
  
      return PreviewForm;
  })(_react.Component);
  
  PreviewForm = createForm({
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var banner = props.banner;
  
          if (banner) {
  
              return {
                  title: {
                      value: banner.title
                  },
                  url: {
                      value: banner.url
                  }
  
              };
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {
  
          //console.log.log(props, fields);
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
              props.banner[key] = fields[key].value;
          });
      }
  })(PreviewForm);
  
  // 模态框型
  
  var ModalForm = (function (_Component3) {
      _inherits(ModalForm, _Component3);
  
      function ModalForm() {
          var _this3 = this;
  
          _classCallCheck(this, ModalForm);
  
          _get(Object.getPrototypeOf(ModalForm.prototype), "constructor", this).apply(this, arguments);
  
          this.handleSubmit = function () {
              //console.log.log(this.props.form.getFieldsValue());
              //
              _this3.props.onCancel();
          };
      }
  
      _createClass(ModalForm, [{
          key: "render",
          value: function render() {
  
              //console.log.log(this.props);
  
              var getFieldProps = this.props.form.getFieldProps;
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: "预览及其他设置",
                          visible: this.props.visible,
                          onCancel: this.props.onCancel,
                          onOk: this.handleSubmit },
                      _react2["default"].createElement("img", { alt: "example", style: { 'width': '100%' }, src: this.props.src }),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({}, formItemLayout, {
                              label: "标题" }),
                          _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('title', {}), { type: "text", autoComplete: "off" }))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({}, formItemLayout, {
                              label: "链接" }),
                          _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('url', {}), { type: "url", autoComplete: "off" }))
                      )
                  )
              );
          }
      }]);
  
      return ModalForm;
  })(_react.Component);
  
  ModalForm = createForm({
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var banner = props.banner;
  
          if (banner) {
  
              return {
                  title: {
                      value: banner.title
                  },
                  url: {
                      value: banner.url
                  }
  
              };
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {
  
          //console.log.log(props, fields);
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
              props.banner[key] = fields[key].value;
          });
      }
  })(ModalForm);
  module.exports = exports["default"];
  /*<Button disabled={initialList.length == 5}
  onClick={()=>this.add(uuid,dataBanner,initialList)}
  style={{ marginRight: 8 }}>新增广告条</Button>*/ /*这是非模态预览框，需要测试*/ /*你觉得这预览框还要不要呢？*/ /*<ModalForm visible={this.state.previewVisible}
                                                                                            src={this.state.bannerImgIdData}
                                                                                            banner={this.state.bannerSetting}
                                                                                            onCancel={this.handleCancel}>
                                                                                  </ModalForm>*/ /*<div style={{'margin':'16px 128px'}} className="ant-fix">
                                                                                                 <img alt="example" src={this.props.src} alt="选中图片进行预览"/>
                                                                                                 </div>*/ /*<div style={{'margin':'16px 0 0 128px'}}>
                                                                                                          <FormItem>
                                                                                                          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
                                                                                                          </FormItem>
                                                                                                          </div>*/

});
