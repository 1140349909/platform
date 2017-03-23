define('admin/component/SettingIntegralForm/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  var RadioButton = _antd.Radio.Button;
  var RadioGroup = _antd.Radio.Group;
  var Option = _antd.Select.Option;
  
  /*封装模态框类，与表单配合使用*/
  
  var SettingIntegralForm = (function (_Component) {
      _inherits(SettingIntegralForm, _Component);
  
      function SettingIntegralForm(props) {
          var _this = this;
  
          _classCallCheck(this, SettingIntegralForm);
  
          _get(Object.getPrototypeOf(SettingIntegralForm.prototype), "constructor", this).call(this, props);
          this.state = {
              /*data: {
                  ...this.props.data
              }*/
          };
  
          this.handleSubmit = function () {
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  } else {
                      //const formData = this.props.form.getFieldsValue();
  
                      var formData = values;
                      // 验证
                      _this.props.updateIntegralExchange(formData);
                  }
              });
          };
  
          this.onChange = function (e) {};
  
          this.render = function () {
  
              /*表单相应设置*/
              //console.log(this.props);
  
              /*let {data} = this.props;
              if (!data) {
                  return null
              }*/
  
              // console.log(data);
  
              var _props$form = _this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Form,
                      { inline: true },
                      _react2["default"].createElement(
                          FormItem,
                          {
                              label: "平台积分兑换比例：" },
                          _react2["default"].createElement(
                              "span",
                              null,
                              "1元   =     "
                          ),
                          _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('integral', {
                              rules: [{
                                  type: 'number',
                                  required: true,
                                  message: '请设定当前积分'
                              }]
                          }), {
                              min: 1,
                              style: { width: 200 },
                              type: "number" })),
                          _react2["default"].createElement(
                              "span",
                              null,
                              "积分"
                          ),
                          "    ",
                          _react2["default"].createElement(
                              "span",
                              { style: { 'color': '#FF9900' } },
                              "（积分兑换比率平台通用，主要用于商城积分抵现）"
                          )
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { type: "primary",
                                  style: { 'margin': '15px' },
                                  onClick: _this.handleSubmit },
                              "确定"
                          )
                      )
                  )
              );
          };
      }
  
      return SettingIntegralForm;
  })(_react.Component);
  
  exports["default"] = createForm({
  
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var dataIntegral = props.dataIntegral;
  
          if (dataIntegral) {
              return {
                  integral: {
                      value: dataIntegral.value
                  }
              };
          } else {
              return {};
          }
      },
      /*当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store*/
      onFieldsChange: function onFieldsChange(props, fields) {
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
  
              props.dataIntegral.value = fields[key].value;
          });
      }
  
  })(SettingIntegralForm);
  module.exports = exports["default"];

});
