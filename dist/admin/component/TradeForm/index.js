define('admin/component/TradeForm/index.jsx', function(require, exports, module) {

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
  
  var FormItem = _antd.Form.Item;
  var Option = _antd.Select.Option;
  
  var TradeForm = (function (_Component) {
      _inherits(TradeForm, _Component);
  
      function TradeForm(props) {
          var _this = this;
  
          _classCallCheck(this, TradeForm);
  
          _get(Object.getPrototypeOf(TradeForm.prototype), "constructor", this).call(this, props);
          this.state = {
              data: _extends({}, this.props.data)
          };
  
          this.handleSubmit = function () {
  
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      //console.log.log('Errors in form!!!');
                      return;
                  } else {
                      //const formData = this.props.form.getFieldsValue();
  
                      var formData = values;
  
                      //console.log.log(formData);
                      //console.log.log(this.props.data);
                      // 验证
                      _this.props.save(formData, _this.props.data);
  
                      //this.props.reset(this.props.data.pageIndex);
                  }
              });
          };
      }
  
      _createClass(TradeForm, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var cfg = {};
  
              var address = data.address;
  
              switch (data.buyType) {
                  case 'yyg':
                      cfg = data.yyg;
                      break;
                  case 'mall':
                      cfg = data.mall;
                      break;
              }
  
              //console.log(cfg);
  
              //console.log.log(this.props);
  
              var visible = this.props.type == 'submit',
                  title = '提交物流信息';
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              //定义物流数据模型
  
              var vendorModel = [{
                  name: '顺丰快递',
                  value: '顺丰'
              }, {
                  name: '圆通快递',
                  value: '圆通'
              }, {
                  name: '中通快递',
                  value: '中通'
              }, {
                  name: '申通快递',
                  value: '申通'
              }, {
                  name: '韵达快递',
                  value: '韵达'
              }];
  
              var selectList = [];
  
              for (var i = 0; i < vendorModel.length; i++) {
  
                  var _data = vendorModel[i];
  
                  selectList.push(_react2["default"].createElement(
                      Option,
                      { value: _data.value, key: i },
                      _data.name
                  ));
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: title,
                          visible: visible,
                          onOk: this.handleSubmit,
                          onCancel: function () {
                              return _this2.props.reset(_this2.props.data.pageIndex);
                          } },
                      _react2["default"].createElement(
                          _antd.Form,
                          { horizontal: true },
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "收货人：" }),
                              _react2["default"].createElement(
                                  "p",
                                  { className: "ant-form-text", id: "consignee", name: "consignee" },
                                  data != null ? address.name : ''
                              )
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "联系方式：" }),
                              _react2["default"].createElement(
                                  "p",
                                  { className: "ant-form-text", id: "mobile", name: "mobile" },
                                  data != null ? address.mobile : ''
                              )
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "联系地址：" }),
                              _react2["default"].createElement(
                                  "p",
                                  { className: "ant-form-text", id: "address", name: "address" },
                                  data != null ? address.prov + ' ' + address.city + ' ' + address.region + ' ' + address.street : ''
                              )
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "快递：" }),
                              _react2["default"].createElement(
                                  _antd.Select,
                                  _extends({ showSearch: true,
                                      placeholder: "请选择快递",
                                      optionFilterProp: "children",
                                      notFoundContent: "无法找到"
                                  }, getFieldProps('vendor', {
                                      rules: [{
                                          required: true,
                                          message: '请选择快递'
                                      }]
                                  })),
                                  selectList
                              )
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "运单号：" }),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('code', {
                                  rules: [{
                                      required: true,
                                      message: '请输入运单号'
                                  }]
                              }), {
                                  type: "text",
                                  placeholder: "输入运单号",
                                  autoComplete: "off" }))
                          )
                      )
                  )
              );
          }
      }]);
  
      return TradeForm;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data) {
              return {
                  vendor: {
                      value: data.vendor
                  },
                  code: {
                      value: data.code
                  }
              };
          } else {
              return {};
          }
      },
      // 当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store
      onFieldsChange: function onFieldsChange(props, fields) {
          //const keys = Object.keys(fields)
          //keys.forEach(key=> {
          //    props.data[key] = fields[key].value
          //})
      }
  })(TradeForm);
  module.exports = exports["default"];

});
