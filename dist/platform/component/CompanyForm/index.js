define('platform/component/CompanyForm/index.jsx', function(require, exports, module) {

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
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var FormItem = _antd.Form.Item;
  var RadioGroup = _antd.Radio.Group;
  
  var CompanyForm = (function (_Component) {
      _inherits(CompanyForm, _Component);
  
      function CompanyForm(props) {
          var _this = this;
  
          _classCallCheck(this, CompanyForm);
  
          _get(Object.getPrototypeOf(CompanyForm.prototype), "constructor", this).call(this, props);
  
          this.handleSubmit = function (id) {
  
              _this.props.form.validateFieldsAndScroll(function (errors, values) {
                  if (!!errors) {
                      //console.log.log('Errors in form!!!');
                      return;
                  } else {
                      var formData = _this.props.form.getFieldsValue();
  
                      var submitData = {
                          "approved": true,
                          "memo": formData.memo
                      };
  
                      //提交
                      _this.props.approve(id, submitData);
                  }
              });
          };
      }
  
      //提交数据
  
      _createClass(CompanyForm, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var visible = this.props.visible;
  
              var formItemLayout = {
                  labelCol: { span: 2 },
                  wrapperCol: { span: 22 }
              };
  
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var id = data.id,
                  uin = data.uin,
                  form = '',
                  onOk = undefined,
                  onCancel = undefined,
                  textOk = '',
                  textCancel = '';
  
              var link = _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/mall/linkin';
  
              if (data.status == 'AUTHENTICATION') {
  
                  textOk = '确定';
                  textCancel = '取消';
  
                  onOk = this.props.reset;
                  onCancel = this.props.reset;
              } else {
                  form = _react2["default"].createElement(
                      _antd.Form,
                      { horizontal: true },
                      _react2["default"].createElement(
                          FormItem,
                          _extends({}, formItemLayout, {
                              label: "审核备注" }),
                          _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('memo', {
                              rules: [{}]
                          }), { type: "textarea", rows: 4, autoComplete: "off" }))
                      )
                  );
  
                  textOk = '通过';
                  textCancel = '取消';
  
                  onOk = function () {
                      return _this2.handleSubmit(id);
                  };
                  onCancel = this.props.reset;
              }
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  { title: "企业",
                      width: "960",
                      visible: visible,
                      onOk: onOk, onCancel: onCancel,
                      okText: textOk, cancelText: textCancel },
                  _react2["default"].createElement(
                      _antd.Card,
                      null,
                      _react2["default"].createElement(
                          _antd.Row,
                          { style: { 'padding': '0 12px' } },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 12 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "企业名称：",
                                      data.name
                                  ),
                                  _react2["default"].createElement("br", null),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "主营商品：",
                                      data.products
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { className: "gutter-row", span: 12 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "品牌类型：",
                                      data.business
                                  )
                              )
                          )
                      ),
                      _react2["default"].createElement("br", null),
                      _react2["default"].createElement(
                          _antd.Row,
                          { style: { 'padding': '0 12px' } },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 12 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "联系人：",
                                      data.contact ? data.contact.name : '-'
                                  ),
                                  _react2["default"].createElement("br", null),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "联系邮箱：",
                                      data.contact ? data.contact.email : '-'
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              _antd.Col,
                              { className: "gutter-row", span: 12 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "联系电话：",
                                      data.contact ? data.contact.mobile : '-'
                                  )
                              )
                          )
                      ),
                      _react2["default"].createElement("br", null),
                      data.status != 'AUTHENTICATION' && form,
                      data.status == 'AUTHENTICATION' && _react2["default"].createElement(
                          _antd.Row,
                          { style: { 'padding': '0 12px' } },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 24 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "审核备注：",
                                      data.approves
                                  )
                              )
                          )
                      )
                  ),
                  _react2["default"].createElement("br", null),
                  _react2["default"].createElement(
                      _antd.Card,
                      null,
                      _react2["default"].createElement(
                          _antd.Row,
                          { style: { 'padding': '0 12px' } },
                          _react2["default"].createElement(
                              _antd.Col,
                              { span: 12 },
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "平台账号：",
                                      data.userName
                                  ),
                                  _react2["default"].createElement("br", null),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "移动端链接：",
                                      link
                                  ),
                                  _react2["default"].createElement("br", null),
                                  _react2["default"].createElement(
                                      "p",
                                      null,
                                      "移动端二维码：",
                                      _react2["default"].createElement("img", { style: { 'verticalAlign': 'top', 'border': '1px solid #e7e7e7' },
                                          src: _commonUtilMedia2["default"].getQrcodeUrl(120, 120, link) })
                                  )
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return CompanyForm;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data) {
              return {
                  approved: {
                      value: 'true'
                  },
                  memo: {
                      value: data.memo
                  }
              };
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {}
  })(CompanyForm);
  module.exports = exports["default"];
  /*<FormItem
  {...formItemLayout}
  label="审核状态">
  <RadioGroup {...getFieldProps('approved', {
  initialValue:'true',
  exclusive: true,
  rules: [
  {}
  ]
  })}>
  <Radio value='true'>通过</Radio>
  <Radio value='false'>不通过</Radio>
  </RadioGroup>
  </FormItem>*/ /*开通商城才显示下面内容*/ /*<br/>
                                <p>客户端名称：{data.uin}</p>*/

});
