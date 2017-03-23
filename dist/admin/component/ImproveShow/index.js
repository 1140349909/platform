define('admin/component/ImproveShow/index.jsx', function(require, exports, module) {

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
  
  var _commonUtil = require("common/util/index");
  
  // import "index.scss";
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  
  var ImproveShow = (function (_Component) {
      _inherits(ImproveShow, _Component);
  
      function ImproveShow(props) {
          var _this = this;
  
          _classCallCheck(this, ImproveShow);
  
          _get(Object.getPrototypeOf(ImproveShow.prototype), "constructor", this).call(this, props);
          this.state = {
              visible: false
          };
  
          this.handleSubmit = function () {
  
              //console.log(this.props.form.getFieldsValue());
  
              var value = _this.props.form.getFieldsValue();
  
              console.log(value);
  
              /*let submitData = {
                  "brandAuth": booleanToString(value.brandAuth, 'upper'),
                  "contentAuth": booleanToString(value.contentAuth, 'upper'),
                  "mallAuth": booleanToString(value.mallAuth, 'upper'),
                  "mallOpMode": "S",
                  "partnerAuth": booleanToString(value.partnerAuth, 'upper'),
                  "yygAuth": booleanToString(value.yygAuth, 'upper')
              };*/
  
              // this.props.updateMallAuth(submitData);
          };
  
          this.handleCancel = function (data) {
              data.enable = false;
              _this.setState({
                  visible: false
              });
              console.log(data);
          };
      }
  
      _createClass(ImproveShow, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var _props = this.props;
              var data = _props.data;
              var type = _props.type;
  
              console.log(data);
  
              if (!data) {
                  return null;
              }
  
              var getFieldProps = this.props.form.getFieldProps;
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              var title = undefined,
                  config = undefined;
  
              var visible = data.enable;
  
              switch (type) {
                  case 'wechat':
  
                      title = '微信支付配置';
  
                      config = _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "微信公众号Id："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('appid', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 18,
                                      message: '微信公众号Id长度一般为18个字符'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "输入微信公众号AppId，长度一般为18个字符" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "微信公众号AppSecret："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('secret', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 32,
                                      message: '微信公众号AppSecret长度一般为32个字符'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "输入微信公众号AppSecret，长度一般为32个字符" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "微信商城Id："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('muchId', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 10,
                                      message: '微信商城Id长度一般为10个字符'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "输入微信商城Id，长度一般为10个字符" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "微信商城App密钥："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('muchKey', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 32,
                                      message: '微信商城App密钥长度一般为32个字符'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "输入微信商城App密钥，长度一般为32个字符" }))
                          )
                      );
  
                      break;
                  case 'alipay':
  
                      title = '支付宝支付配置';
  
                      config = _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "支付宝账号："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('account', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      message: '请输入支付宝账号'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "请输入支付宝账号" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "交易安全检验码："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('key', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      message: '请输入交易安全检验码'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "请输入交易安全检验码" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "合作者Id："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('pid', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      message: '请输入合作者Id'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "请输入合作者Id" }))
                          )
                      );
                      break;
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { width: "960",
                          title: title,
                          visible: visible,
                          onOk: this.handleSubmit,
                          onCancel: function () {
                              return _this2.handleCancel(data);
                          } },
                      _react2["default"].createElement(
                          _antd.Form,
                          { horizontal: true },
                          config
                      )
                  )
              );
          }
      }]);
  
      return ImproveShow;
  })(_react.Component);
  
  exports["default"] = createForm({
  
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
          var type = props.type;
  
          console.log(data);
  
          if (data) {
  
              switch (type) {
                  case 'wechat':
  
                      return {
                          "appid": {
                              value: data.appid
                          },
                          "muchId": {
                              value: data.muchId
                          },
                          "muchKey": {
                              value: data.muchKey
                          },
                          "secret": {
                              value: data.secret
                          }
                      };
                  case 'alipay':
                      return {
                          "account": {
                              value: data.account
                          },
                          "key": {
                              value: data.key
                          },
                          "pid": {
                              value: data.pid
                          }
                      };
              }
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {
  
          console.log(props, fields);
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
  
              /*switch (key) {
               case 'wechat':
               props.data.payType[key].enable = fields[key].value;
                props.updateCustomerWechat(props.id,{
               enable:props.data.payType[key].enable
               });
                 break;
               case 'alipay':
               props.data.payType[key].enable = fields[key].value;
                props.updateCustomerAlipay(props.id,{
               enable:props.data.payType[key].enable
               });
                break;
               case 'name':
               props.data.name = fields[key].value;
                //长度小于8直接提交！
               if(props.data.name.length <=8 ){
               props.updateMallBasic({
               name:props.data.name
               });
               }
               break;
               default:
               props.data.mallAuth[key] = booleanToString(fields[key].value, 'upper');
               break;
               }*/
  
          });
      }
  
  })(ImproveShow);
  module.exports = exports["default"];

});
