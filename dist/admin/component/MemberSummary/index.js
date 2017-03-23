define('admin/component/MemberSummary/index.jsx', function(require, exports, module) {

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
  var openNotificationWithIcon = function openNotificationWithIcon(type, tit, text) {
      _antd.notification[type]({
          message: tit,
          description: text
      });
  };
  
  // 标题栏
  
  var MemberSummary = (function (_Component) {
      _inherits(MemberSummary, _Component);
  
      function MemberSummary() {
          _classCallCheck(this, MemberSummary);
  
          _get(Object.getPrototypeOf(MemberSummary.prototype), "constructor", this).apply(this, arguments);
      }
  
      // 发送信息弹出框
  
      _createClass(MemberSummary, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  { className: "membersshow" },
                  _react2["default"].createElement(
                      "div",
                      { className: "membersshow-title" },
                      _react2["default"].createElement(
                          "h2",
                          null,
                          "会员总数"
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          "-"
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "membersshow-title" },
                      _react2["default"].createElement(
                          "h2",
                          null,
                          "今日参与会员数"
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          "-"
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "membersshow-title" },
                      _react2["default"].createElement(
                          "h2",
                          null,
                          "今日新增会员"
                      ),
                      _react2["default"].createElement(
                          "p",
                          null,
                          "-"
                      )
                  ),
                  _react2["default"].createElement("div", { className: "membersshow-button" })
              );
          }
      }]);
  
      return MemberSummary;
  })(_react.Component);
  
  exports["default"] = MemberSummary;
  
  var MemberModal = (function (_Component2) {
      _inherits(MemberModal, _Component2);
  
      function MemberModal(props) {
          _classCallCheck(this, MemberModal);
  
          _get(Object.getPrototypeOf(MemberModal.prototype), "constructor", this).call(this, props);
          this.state = {
              visible: false,
              loading: false
          };
      }
  
      _createClass(MemberModal, [{
          key: "showModal",
          value: function showModal() {
              this.setState({
                  visible: true
              });
          }
      }, {
          key: "handleOk",
          value: function handleOk(e) {
              var _this = this;
  
              this.setState({ loading: true });
              this.handleSubmit(e);
              setTimeout(function () {
                  _this.setState({ loading: false, visible: false });
                  openNotificationWithIcon('success', '系统信息发送成功！', '快点去写文案Ok,如果不写文案，详细信息就不显示了');
              }, 3000);
          }
      }, {
          key: "handleCancel",
          value: function handleCancel(e) {
              this.setState({
                  visible: false
              });
          }
      }, {
          key: "handleSubmit",
          value: function handleSubmit(e) {
              e.preventDefault();
          }
      }, {
          key: "render",
          value: function render() {
              var getFieldProps = this.props.form.getFieldProps;
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Button,
                      { type: "primary", onClick: this.showModal.bind(this) },
                      "发送系统消息"
                  ),
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: "请输入主题",
                          visible: this.state.visible,
                          onOk: this.handleOk.bind(this),
                          onCancel: this.handleCancel.bind(this),
                          okText: "OK",
                          cancelText: "Cancel",
                          footer: [_react2["default"].createElement(
                              _antd.Button,
                              { key: "back", type: "ghost", size: "large", onClick: this.handleCancel.bind(this) },
                              "返 回"
                          ), _react2["default"].createElement(
                              _antd.Button,
                              { key: "submit", type: "primary", size: "large", loading: this.state.loading, onClick: this.handleOk.bind(this) },
                              "提 交"
                          )] },
                      _react2["default"].createElement(
                          _antd.Form,
                          { onSubmit: this.handleSubmit.bind(this) },
                          _react2["default"].createElement(
                              FormItem,
                              {
                                  label: "用户名：" },
                              _react2["default"].createElement(_antd.Input, _extends({ type: "text" }, getFieldProps('theme'), { placeholder: "请输入主题" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              {
                                  label: "内容：" },
                              _react2["default"].createElement(_antd.Input, _extends({ type: "textarea" }, getFieldProps('theme2'), { id: "control-textarea", rows: "3" }))
                          )
                      )
                  )
              );
          }
      }]);
  
      return MemberModal;
  })(_react.Component);
  
  MemberModal = _antd.Form.create()(MemberModal);
  module.exports = exports["default"];

});
