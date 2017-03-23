define('platform/component/CompanyShow/index.jsx', function(require, exports, module) {

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
  
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  
  var CompanyShow = (function (_Component) {
      _inherits(CompanyShow, _Component);
  
      function CompanyShow(props) {
          var _this = this;
  
          _classCallCheck(this, CompanyShow);
  
          _get(Object.getPrototypeOf(CompanyShow.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.handleSubmit = function () {
  
              var value = _this.props.form.getFieldsValue();
  
              var submitData = {
                  "brandAuth": (0, _commonUtil.booleanToString)(value.brandAuth, 'upper'),
                  "contentAuth": (0, _commonUtil.booleanToString)(value.contentAuth, 'upper'),
                  "mallAuth": (0, _commonUtil.booleanToString)(value.mallAuth, 'upper'),
                  "mallOpMode": "S",
                  "partnerAuth": (0, _commonUtil.booleanToString)(value.partnerAuth, 'upper'),
                  "yygAuth": (0, _commonUtil.booleanToString)(value.yygAuth, 'upper')
              };
  
              _this.props.mallAuth(_this.props.data.id, submitData);
          };
      }
  
      _createClass(CompanyShow, [{
          key: "render",
          value: function render() {
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var mallAuth = data.mallAuth;
  
              var visible = this.props.visible;
  
              var getFieldProps = this.props.form.getFieldProps;
  
              var columns = [{
                  title: '模块名称',
                  dataIndex: 'name',
                  key: 'name'
              }, {
                  title: '功能说明',
                  dataIndex: 'info',
                  key: 'info'
              }, {
                  title: '开通说明',
                  dataIndex: 'help',
                  key: 'help'
              }, {
                  title: '开通状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: function render(text, record) {
  
                      var status = '';
  
                      switch (record.status) {
                          case 'TRUE':
                              status = _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "check-circle", style: { 'color': '#2db7f5' } }),
                                  "   ",
                                  _react2["default"].createElement(
                                      "span",
                                      null,
                                      "已开通"
                                  )
                              );
                              break;
                          default:
                              status = _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(_antd.Icon, { type: "minus-circle", style: { 'color': '#EB8010' } }),
                                  "   ",
                                  _react2["default"].createElement(
                                      "span",
                                      null,
                                      "未开通"
                                  )
                              );
                              break;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          status
                      );
                  }
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  key: 'operation',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.operation != '' && _react2["default"].createElement(
                              FormItem,
                              null,
                              _react2["default"].createElement(_antd.Switch, _extends({}, getFieldProps(record.label, {
                                  valuePropName: 'checked'
                              }), {
                                  checkedChildren: "开",
                                  unCheckedChildren: "关" }))
                          )
                      );
                  }
              }];
  
              var dataSource = [{
                  key: 1,
                  label: 'mallAuth',
                  name: '商城',
                  info: '商品交易、客户端页面展示',
                  help: '',
                  status: mallAuth.mallAuth,
                  operation: mallAuth.mallAuth,
                  children: [{
                      key: 11,
                      name: '爆款商城',
                      info: '现金交易方式',
                      help: '设置支付方式',
                      status: mallAuth.mallAuth,
                      operation: ''
                  }, {
                      key: 12,
                      name: '',
                      info: '允许使用优惠券交易',
                      help: '需开通优惠券营销',
                      status: mallAuth.mallAuth,
                      operation: ''
                  }, {
                      key: 13,
                      name: '',
                      info: '允许积分抵现交易',
                      help: '需开通积分营销',
                      status: mallAuth.mallAuth,
                      operation: ''
                  }, {
                      key: 14,
                      name: '',
                      info: '允许使用固定积分+固定现金交易',
                      help: '需开通积分营销',
                      status: mallAuth.mallAuth,
                      operation: ''
                  }, {
                      key: 15,
                      name: '积分商城',
                      info: '积分纯兑换',
                      help: '需开通积分营销',
                      status: mallAuth.mallAuth,
                      operation: ''
                  }]
              }, {
                  key: 2,
                  label: 'yygAuth',
                  name: '一元购',
                  info: '商品管理及客户端展示',
                  help: '',
                  status: mallAuth.yygAuth,
                  operation: mallAuth.yygAuth,
                  children: [{
                      key: 21,
                      name: '一元购',
                      info: '现金玩法：以现金进行参与',
                      help: '需开通支付方式',
                      status: mallAuth.yygAuth,
                      operation: ''
                  }, {
                      key: 22,
                      name: '积分购',
                      info: '积分玩法：以积分进行参与',
                      help: '需开通积分营销',
                      status: mallAuth.yygAuth,
                      operation: ''
                  }]
              }, {
                  key: 3,
                  label: 'contentAuth',
                  name: '内容模块',
                  info: '内容的编辑，客户端展示',
                  help: '',
                  status: mallAuth.contentAuth,
                  operation: mallAuth.contentAuth
              }, {
                  key: 4,
                  label: 'saleAuth',
                  name: '营销模块',
                  info: '营销方式的设定，内容的嵌入',
                  help: '',
                  status: false,
                  operation: '',
                  children: [{
                      key: 41,
                      name: '积分',
                      info: '设定积分，嵌入到内容',
                      help: '需开通内容模块',
                      status: false,
                      operation: ''
                  }, {
                      key: 42,
                      name: '优惠券',
                      info: '设定优惠券，嵌入到内容',
                      help: '需开通内容模块',
                      status: false,
                      operation: ''
                  }]
              }];
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: "客户详情",
                          width: "960",
                          visible: visible,
                          onOk: this.handleSubmit,
                          onCancel: this.props.reset },
                      _react2["default"].createElement(
                          _antd.Form,
                          null,
                          _react2["default"].createElement(_antd.Table, { columns: columns,
                              dataSource: dataSource,
                              bordered: true })
                      )
                  )
              );
          }
      }]);
  
      return CompanyShow;
  })(_react.Component);
  
  exports["default"] = createForm({
  
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data) {
              return {
                  mallOpMode: {
                      value: data.mallAuth.mallOpMode
                  },
                  partnerAuth: {
                      value: data.mallAuth.partnerAuth == 'TRUE'
                  },
                  brandAuth: {
                      value: data.mallAuth.brandAuth == 'TRUE'
                  },
                  yygAuth: {
                      value: data.mallAuth.yygAuth == 'TRUE'
                  },
                  mallAuth: {
                      value: data.mallAuth.mallAuth == 'TRUE'
                  },
                  contentAuth: {
                      value: data.mallAuth.contentAuth == 'TRUE'
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
  
              props.data.mallAuth[key] = (0, _commonUtil.booleanToString)(fields[key].value, 'upper');
          });
      }
  
  })(CompanyShow);
  module.exports = exports["default"];

});
