define('admin/component/SettingModifyForm/MallModifyForm.jsx', function(require, exports, module) {

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
  
  '';
  
  var Step = _antd.Steps.Step;
  var Dragger = _antd.Upload.Dragger;
  var FormItem = _antd.Form.Item;
  
  // 平台设置-修改弹出层表单
  
  var SettingMallModifyForm = (function (_Component) {
      _inherits(SettingMallModifyForm, _Component);
  
      function SettingMallModifyForm(props) {
          var _this = this;
  
          _classCallCheck(this, SettingMallModifyForm);
  
          _get(Object.getPrototypeOf(SettingMallModifyForm.prototype), "constructor", this).call(this, props);
  
          this.handleSubmitClick = function () {
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  }
                  _this.props.mallModify(_this.handleSubmit());
              });
          };
  
          this.handleSubmit = function (e) {
  
              var fieldsValue = _this.props.form.getFieldsValue();
  
              var data = {
                  name: _this.props.data.name || '',
                  contact: _this.props.data.contact || '',
                  share: _this.props.data.share || {}
              };
  
              switch (_this.props.currentData.type) {
  
                  case 'name':
                      data.name = fieldsValue.name;
                      break;
  
                  case 'contactName':
                      data.contact.name = fieldsValue.contactName;
                      break;
  
                  case 'contactMobile':
                      data.contact.mobile = fieldsValue.mobile;
                      break;
  
                  case 'shareTitle':
                      data.share.title = fieldsValue.shareTitle;
                      break;
  
                  case 'shareDesc':
                      data.share.desc = fieldsValue.shareDesc;
                      break;
  
              }
  
              return data;
          };
      }
  
      _createClass(SettingMallModifyForm, [{
          key: "render",
          value: function render() {
  
              // 获取表单相关API
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var nameProps = getFieldProps('name');
  
              var contactNameProps = getFieldProps('contactName');
  
              var mobileProps = getFieldProps('mobile');
  
              var shareTitleProps = getFieldProps('shareTitle');
  
              var shareDescProps = getFieldProps('shareDesc');
  
              /* const nameProps = getFieldProps('name');
                const contactNameProps = getFieldProps('contactName');
                const mobileProps = getFieldProps('mobile');*/
  
              var visible = this.props.type === 'showMallModify';
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              if (this.props.type === 'showMallModify') {
                  var _props$currentData = this.props.currentData;
                  var type = _props$currentData.type;
                  var title = _props$currentData.title;
                  var value = _props$currentData.value;
  
                  return _react2["default"].createElement(
                      _antd.Modal,
                      {
                          title: "详情设置修改",
                          visible: visible,
                          onCancel: this.props.reset,
                          footer: [_react2["default"].createElement(
                              _antd.Button,
                              {
                                  key: "back",
                                  type: "ghost",
                                  size: "large",
                                  onClick: this.props.reset },
                              "返 回"
                          ), _react2["default"].createElement(
                              _antd.Button,
                              {
                                  key: "submit",
                                  type: "primary",
                                  size: "large",
                                  onClick: this.handleSubmitClick },
                              "提 交"
                          )] },
                      _react2["default"].createElement(
                          _antd.Form,
                          { horizontal: true, onSubmit: this.handleSubmit.bind(this) },
                          type == 'name' && _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: title
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({
                                  type: "text"
                              }, nameProps))
                          ),
                          type == 'contactName' && _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: title
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({
                                  type: "text"
                              }, contactNameProps))
                          ),
                          type == 'contactMobile' && _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: title
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({
                                  type: "text"
                              }, mobileProps))
                          ),
                          type == 'shareTitle' && _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: title
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({
                                  type: "text"
                              }, shareTitleProps))
                          ),
                          type == 'shareDesc' && _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: title
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({
                                  type: "text"
                              }, shareDescProps))
                          )
                      )
                  );
              } else {
                  return null;
              }
          }
      }]);
  
      return SettingMallModifyForm;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var currentData = props.currentData;
          var type = props.type;
  
          if (type == 'showMallModify') {
  
              switch (currentData.type) {
  
                  case 'name':
                      return {
                          name: {
                              value: currentData.value
                          }
                      };
                      break;
  
                  case 'contactName':
                      return {
                          contactName: {
                              value: currentData.value
                          }
                      };
                      break;
  
                  case 'contactMobile':
                      return {
                          mobile: {
                              value: currentData.value
                          }
                      };
                      break;
  
                  case 'shareTitle':
                      return {
                          shareTitle: {
                              value: currentData.value
                          }
                      };
                      break;
  
                  case 'shareDesc':
                      return {
                          shareDesc: {
                              value: currentData.value
                          }
                      };
                      break;
  
              }
          } else {
              return {};
          }
      }
  })(SettingMallModifyForm);
  module.exports = exports["default"];

});
