define('admin/component/TradeShow/index.jsx', function(require, exports, module) {

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
  
  var FormItem = _antd.Form.Item;
  
  /*封装模态框类，与表单配合使用*/
  
  var TradeShow = (function (_Component) {
      _inherits(TradeShow, _Component);
  
      function TradeShow(props) {
          var _this = this;
  
          _classCallCheck(this, TradeShow);
  
          _get(Object.getPrototypeOf(TradeShow.prototype), "constructor", this).call(this, props);
  
          this.render = function () {
              var data = _this.props.data;
  
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
  
              //console.log.log(data);
  
              var title = '',
                  visible = false,
                  display = '';
  
              switch (_this.props.type) {
                  case 'showConsignee':
                      title = '查看信息';
                      visible = true;
                      display = true;
                      break;
                  case 'showLogistics':
                      title = '查看物流';
                      visible = true;
                      display = false;
                      break;
  
              }
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: title,
                          visible: visible,
                          onCancel: function () {
                              return _this.props.reset(_this.props.data.pageIndex);
                          },
                          onOk: function () {
                              return _this.props.reset(_this.props.data.pageIndex);
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
                              "div",
                              { style: { display: display ? 'none' : 'block' } },
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "快递：" }),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "ant-form-text", id: "vendor", name: "vendor" },
                                      data.logistic != undefined ? data.logistic.vendor : ''
                                  )
                              ),
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "运单号：" }),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "ant-form-text", id: "code", name: "code" },
                                      data.logistic != undefined ? data.logistic.code : ''
                                  )
                              )
                          )
                      )
                  )
              );
          };
      }
  
      return TradeShow;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({})(TradeShow);
  module.exports = exports["default"];

});
