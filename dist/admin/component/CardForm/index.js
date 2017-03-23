define('admin/component/CardForm/index.jsx', function(require, exports, module) {

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
  
  var _jquery = require("node_modules/jquery/dist/jquery");
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  '';
  
  '';
  
  var _rcColorPicker = require('node_modules/rc-color-picker/lib/index');
  
  var _rcColorPicker2 = _interopRequireDefault(_rcColorPicker);
  
  var FormItem = _antd.Form.Item;
  var RadioGroup = _antd.Radio.Group;
  
  var CardForm = (function (_Component) {
      _inherits(CardForm, _Component);
  
      function CardForm(props) {
          var _this = this;
  
          _classCallCheck(this, CardForm);
  
          _get(Object.getPrototypeOf(CardForm.prototype), "constructor", this).call(this, props);
  
          this.handelSubmit = function () {
              _this.props.form.validateFields(function (errors, values) {
  
                  if (!!errors) {
                      return;
                  }
                  var cardStyle = _this.props.cardStyle;
  
                  var data = {
                      bgRadio: values.bgRadio,
                      bgColor: cardStyle.bgColor,
                      bgImg: _this.props.cardStyle.bgImg,
                      alpha: cardStyle.alpha,
                      title: values.title,
                      fontColor: cardStyle.fontColor
                  };
  
                  if (values.bgRadio == 'img') {
                      if (_this.props.cardStyle.bgImg == '') {
                          alert('请上传会员背景图片！');
                          return false;
                      }
                  }
  
                  _this.props.updateCardStyle(data);
              });
          };
      }
  
      _createClass(CardForm, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  _antd.Card,
                  {
                      title: "基本信息",
                      className: "card-form" },
                  _react2["default"].createElement(CardFormContainer, {
                      setCardStyle: this.props.setCardStyle,
                      cardStyle: this.props.cardStyle,
                      handelSubmit: this.handelSubmit,
                      form: this.props.form })
              );
          }
      }]);
  
      return CardForm;
  })(_react.Component);
  
  exports.CardForm = CardForm;
  
  var CardFormContainer = (function (_Component2) {
      _inherits(CardFormContainer, _Component2);
  
      function CardFormContainer() {
          var _this2 = this;
  
          _classCallCheck(this, CardFormContainer);
  
          _get(Object.getPrototypeOf(CardFormContainer.prototype), "constructor", this).apply(this, arguments);
  
          this.state = {
              colorShow: 'none',
              imgShow: 'block',
              value: 'img'
          };
  
          this.colorsSelect = function () {
              document.getElementById('foo').jscolor.show();
          };
  
          this.handlerChangeColor = function (colors) {
              _this2.props.setCardStyle({
                  bgColor: colors.color,
                  alpha: colors.alpha
              });
          };
  
          this.handlerChangefontColor = function (colors) {
              _this2.props.setCardStyle({
                  fontColor: colors.color
              });
          };
  
          this.updateChange = function (info) {
              if (info.file.status === 'done') {
                  if (info.file.response.errCode === 0) {
                      _this2.props.setCardStyle({
                          bgImg: info.file.response.data
                      });
                      updateInfo();
                  }
              }
          };
  
          this.radioChange = function (e) {
              _this2.props.setCardStyle({
                  bgRadio: e.target.value
              });
          };
      }
  
      // cardStyle
  
      _createClass(CardFormContainer, [{
          key: "render",
          value: function render() {
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldsValue = _props$form.getFieldsValue;
              var _props = this.props;
              var setCardStyle = _props.setCardStyle;
              var cardStyle = _props.cardStyle;
  
              var bgRadioProps = getFieldProps('bgRadio', {
                  initialValue: 'img',
                  onChange: this.radioChange
              });
  
              var titleProps = getFieldProps('title', {
                  rules: [{ required: true, message: '标题不得为空！', max: 15 }],
                  onChange: function onChange(e) {
                      var val = e.target.value;
  
                      setCardStyle({
                          title: val
                      });
                  }
              });
  
              var bgImgProps = getFieldProps('bgImg', {
                  onChange: this.updateChange
              });
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 8 }
              };
  
              var uploadProps = {
                  name: 'media',
                  showUploadList: false,
                  withCredentials: true,
                  action: _commonUtilMedia2["default"].upLoad
              };
  
              return _react2["default"].createElement(
                  _antd.Form,
                  { horizontal: true },
                  _react2["default"].createElement(
                      FormItem,
                      _extends({
                          label: "卡券标题",
                          help: "标题长度为15个字"
                      }, formItemLayout),
                      _react2["default"].createElement(_antd.Input, _extends({}, titleProps, {
                          placeholder: "会员卡" }))
                  ),
                  _react2["default"].createElement(
                      FormItem,
                      _extends({
                          label: "字体颜色"
                      }, formItemLayout),
                      _react2["default"].createElement(_rcColorPicker2["default"], {
                          animation: "slide-up",
                          placement: "bottomLeft",
                          color: cardStyle.fontColor,
                          onChange: this.handlerChangefontColor })
                  ),
                  _react2["default"].createElement(
                      FormItem,
                      _extends({
                          label: "卡券底图"
                      }, formItemLayout),
                      _react2["default"].createElement(
                          RadioGroup,
                          bgRadioProps,
                          _react2["default"].createElement(
                              _antd.Radio,
                              { value: "img" },
                              "图片"
                          ),
                          _react2["default"].createElement(
                              _antd.Radio,
                              { value: "color" },
                              "颜色"
                          )
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "card-form-radiobox" },
                      cardStyle.bgRadio == 'img' && _react2["default"].createElement(
                          FormItem,
                          {
                              wrapperCol: { span: 18, offset: 4 } },
                          _react2["default"].createElement(
                              _antd.Upload,
                              _extends({}, uploadProps, bgImgProps),
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { type: "ghost" },
                                  _react2["default"].createElement(_antd.Icon, { type: "upload" }),
                                  " 点击上传"
                              ),
                              _react2["default"].createElement(
                                  "span",
                                  null,
                                  "  ",
                                  _react2["default"].createElement(_antd.Icon, { type: "info-circle-o" }),
                                  "请上传580px * 310px的背景图片"
                              )
                          )
                      ),
                      cardStyle.bgRadio == 'color' && _react2["default"].createElement(
                          FormItem,
                          {
                              wrapperCol: { span: 8, offset: 4 } },
                          _react2["default"].createElement(_rcColorPicker2["default"], {
                              animation: "slide-up",
                              placement: "bottomLeft",
                              color: cardStyle.bgColor,
                              alpha: cardStyle.alpha,
                              onChange: this.handlerChangeColor })
                      )
                  ),
                  _react2["default"].createElement(
                      FormItem,
                      {
                          wrapperCol: { span: 8, offset: 4 } },
                      _react2["default"].createElement(
                          _antd.Button,
                          { htmlType: "submit", onClick: this.props.handelSubmit, type: "primary" },
                          "保存"
                      )
                  )
              );
          }
      }]);
  
      return CardFormContainer;
  })(_react.Component);
  
  exports.CardFormContainer = CardFormContainer;
  exports["default"] = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var cardStyle = props.cardStyle;
  
          var bgRadio = undefined;
  
          if (!cardStyle.bgRadio) {
              bgRadio = 'img';
          } else {
              bgRadio = cardStyle.bgRadio;
          }
  
          if (cardStyle) {
              return {
                  title: {
                      value: cardStyle.title
                  },
                  bgRadio: {
                      value: bgRadio
                  }
              };
          } else {
              return {};
          }
      }
  })(CardForm);
  
  // 上传图片成功！
  var updateInfo = function updateInfo() {
      _antd.message.info('上传图片成功!');
  };
  
  // 颜色选择器改变
  
  // upload 改变时处理函数

});
