define('admin/component/ImproveForm/index.jsx', function(require, exports, module) {

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
  
  '';
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _classnames = require("node_modules/classnames/index");
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _commonConfig = require("common/config/index");
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  
  var ImproveForm = (function (_Component) {
      _inherits(ImproveForm, _Component);
  
      function ImproveForm(props) {
          var _this = this;
  
          _classCallCheck(this, ImproveForm);
  
          _get(Object.getPrototypeOf(ImproveForm.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.handleSubmitName = function () {
  
              _this.props.form.validateFields(function (errors, values) {
  
                  if (!!errors) {
                      console.log('Errors in form!!!');
                      return;
                  }
  
                  var submitData = {
                      "name": values.mallName
                  };
  
                  _this.props.updateMallBasic(submitData);
              });
          };
  
          this.handleSubmit = function () {
  
              _this.props.form.validateFields(function (errors, values) {
  
                  if (!!errors) {
                      console.log('Errors in form!!!');
                      return;
                  }
  
                  var submitData = {
                      "brandAuth": (0, _commonUtil.booleanToString)(values.brandAuth, 'upper'),
                      "contentAuth": (0, _commonUtil.booleanToString)(values.contentAuth, 'upper'),
                      "mallAuth": (0, _commonUtil.booleanToString)(values.mallAuth, 'upper'),
                      "mallOpMode": "S",
                      "partnerAuth": (0, _commonUtil.booleanToString)(values.partnerAuth, 'upper'),
                      "yygAuth": (0, _commonUtil.booleanToString)(values.yygAuth, 'upper')
                  };
  
                  _this.props.updateMallAuth(submitData);
              });
  
              //const value = this.props.form.getFieldsValue();
  
              //console.log(this.props.form.getFieldsValue());
          };
  
          this.handleCustomer = function (id, payType) {
  
              _this.props.form.validateFields(function (errors, values) {
  
                  if (!!errors) {
                      console.log('Errors in form!!!');
                      return;
                  }
                  //console.log('Submit!!!');
                  //console.log(values);
  
                  var submitData = undefined;
  
                  switch (payType) {
                      case 'wechat':
                          submitData = {
                              "appid": values.appid,
                              "enable": values.wechat,
                              "muchId": values.muchId,
                              "muchKey": values.muchKey,
                              "secret": values.secret,
                              "useSys": !values.wechat
                          };
                          _this.props.updateCustomerWechat(id, submitData);
                          break;
                      case 'alipay':
                          submitData = {
                              "name": values.name,
                              "account": values.account,
                              "enable": values.alipay,
                              "key": values.key,
                              "pid": values.pid,
                              "useSys": !values.alipay
                          };
                          _this.props.updateCustomerAlipay(id, submitData);
                          break;
                  }
              });
  
              /*const value = this.props.form.getFieldsValue();
                }*/
          };
  
          this.by = function (name) {
              return function (o, p) {
                  var a, b;
                  if (typeof o === "object" && typeof p === "object" && o && p) {
                      a = o[name];
                      b = p[name];
                      if (a === b) {
                          return 0;
                      }
                      if (typeof a === typeof b) {
                          return a < b ? -1 : 1;
                      }
                      return typeof a < typeof b ? -1 : 1;
                  } else {
                      throw "error";
                  }
              };
          };
      }
  
      _createClass(ImproveForm, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var _props = this.props;
              var data = _props.data;
              var uin = _props.uin;
              var id = _props.id;
  
              //console.log(data, uin);
  
              if (!data) {
                  return null;
              }
  
              var link = _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/mall/linkin';
  
              //console.log(uin);
              var mallAuth = data.mallAuth;
  
              var payType = data.payType;
  
              //console.log(mallAuth);
              //构造数据
  
              var number = 0;
  
              var dataSource = [];
  
              for (var authName in mallAuth) {
  
                  if (mallAuth[authName] == 'TRUE') {
                      switch (authName) {
                          case 'mallAuth':
                              dataSource.push({
                                  name: '商城',
                                  index: 0,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/mall/linkin',
                                  src: '/admin/component/ImproveForm/img/mall-checked.png'
                                  // /admin/component/ImproveForm/img/mall.png
                              });
                              number += 1;
                              break;
                          case 'yygAuth':
                              dataSource.push({
                                  name: '一元购',
                                  index: 1,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/yyg/linkin',
                                  src: '/admin/component/ImproveForm/img/yyg-checked.png'
                              });
                              number += 1;
                              break;
                          case 'contentAuth':
                              dataSource.push({
                                  name: '内容',
                                  index: 2,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/content/linkin',
                                  src: '/admin/component/ImproveForm/img/content-checked.png'
                              });
                              number += 1;
                              break;
                          case 'brandAuth':
                              dataSource.push({
                                  name: '会员',
                                  index: 3,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/member/linkin',
                                  src: '/admin/component/ImproveForm/img/member-checked.png'
                              });
                              number += 1;
                              break;
                      }
                  }
              }
  
              dataSource.sort(this.by('index'));
  
              var colNumber = 24 / number;
  
              var colList = [];
  
              for (var i = 0; i < dataSource.length; i++) {
  
                  colList.push(_react2["default"].createElement(
                      _antd.Col,
                      { span: colNumber, key: i },
                      _react2["default"].createElement(
                          "div",
                          { className: "improve-gutter-box" },
                          dataSource[i].name
                      )
                  ));
              }
  
              var getFieldProps = this.props.form.getFieldProps;
  
              //模型1
  
              var moduleList = [];
  
              var imgList1 = [{
                  name: '商城',
                  label: 'mallAuth',
                  desc: '在移动端进行商品出售',
                  src: {
                      "default": '/admin/component/ImproveForm/img/mall-default.png',
                      checked: '/admin/component/ImproveForm/img/mall-checked.png'
                  }
              }, {
                  name: '一元购',
                  label: 'yygAuth',
                  desc: '一元购方式营销商品',
                  src: {
                      "default": '/admin/component/ImproveForm/img/yyg-default.png',
                      checked: '/admin/component/ImproveForm/img/yyg-checked.png'
                  }
              }, {
                  name: '内容',
                  label: 'contentAuth',
                  desc: '在平台编辑文章发布到移动端',
                  src: {
                      "default": '/admin/component/ImproveForm/img/content-default.png',
                      checked: '/admin/component/ImproveForm/img/content-checked.png'
                  }
              }, {
                  name: '会员',
                  label: 'brandAuth',
                  desc: '移动端用户管理自己的信息',
                  src: {
                      "default": '/admin/component/ImproveForm/img/member-default.png',
                      checked: '/admin/component/ImproveForm/img/member-checked.png'
                  }
              }];
  
              //构造选择模型1
              for (var i = 0; i < imgList1.length; i++) {
  
                  var fixClass = (0, _classnames2["default"])({
                      'improve-center': true,
                      'checkBoxFix': true,
                      'cardColorDefault': true,
                      'cardColorChange': mallAuth[imgList1[i].label] == 'TRUE'
                  });
  
                  moduleList.push(_react2["default"].createElement(
                      _antd.Col,
                      { span: 6, key: i },
                      _react2["default"].createElement(
                          "div",
                          { className: fixClass },
                          _react2["default"].createElement(
                              _antd.Checkbox,
                              getFieldProps(imgList1[i].label, {
                                  valuePropName: 'checked'
                              }),
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "improve-module-div" },
                                      _react2["default"].createElement("img", { src: mallAuth[imgList1[i].label] == 'TRUE' ? imgList1[i].src.checked : imgList1[i].src["default"], alt: "" }),
                                      "  ",
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          imgList1[i].name
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      null,
                                      _react2["default"].createElement(
                                          "span",
                                          { className: "improve-module-span" },
                                          imgList1[i].desc
                                      )
                                  )
                              )
                          )
                      )
                  ));
              }
  
              //模型2
  
              var payList = [];
  
              var imgList2 = [{
                  name: '微信',
                  label: 'wechat',
                  desc: '微信支付',
                  src: '/admin/component/ImproveForm/img/wechat.png'
              }, {
                  name: '支付宝',
                  label: 'alipay',
                  desc: '支付宝支付',
                  src: '/admin/component/ImproveForm/img/alipay.png'
              }];
  
              // let hover=false;
  
              //构造选择模型2
              for (var i = 0; i < imgList2.length; i++) {
  
                  var fixClass = (0, _classnames2["default"])({
                      'improve-center': true,
                      'checkBoxFix': true,
                      'cardColorDefault': true,
                      'cardColorChange': payType[imgList2[i].label].enable == true
                  });
  
                  /*let borderClass = classNames({
                   'cardColorChange': hover == true
                   });*/
  
                  payList.push(_react2["default"].createElement(
                      _antd.Col,
                      { span: 8, key: i },
                      _react2["default"].createElement(
                          "div",
                          { className: fixClass },
                          _react2["default"].createElement(
                              _antd.Checkbox,
                              getFieldProps(imgList2[i].label, {
                                  valuePropName: 'checked'
                              }),
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "div",
                                      { className: "improve-pay-div" },
                                      _react2["default"].createElement("img", { src: imgList2[i].src, alt: "" }),
                                      "  ",
                                      _react2["default"].createElement(
                                          "span",
                                          null,
                                          imgList2[i].desc
                                      )
                                  )
                              )
                          )
                      )
                  ));
              }
  
              var paySelectList = [];
  
              var wrapperColValue = payType['wechat'].enable && payType['alipay'].enable ? 16 : 8;
  
              var formItemLayout = {
                  labelCol: { span: 8 },
                  wrapperCol: { span: wrapperColValue }
              };
  
              paySelectList.push(_react2["default"].createElement(
                  _antd.Row,
                  { gutter: 16, key: "paySelect" },
                  payType['wechat'].enable && _react2["default"].createElement(
                      _antd.Col,
                      { span: payType['alipay'].enable ? 12 : 24 },
                      _react2["default"].createElement(
                          _antd.Card,
                          { title: "微信支付配置", extra: _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      { type: "primary", onClick: function () {
                                              return _this2.handleCustomer(id, 'wechat');
                                          } },
                                      "保存配置"
                                  )
                              ) },
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
  
                                  placeholder: "输入微信公众号AppId，长度一般为18个字符" }))
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "微信公众号Secret："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('secret', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 32,
                                      message: '微信公众号Secret长度一般为32个字符'
                                  }]
  
                              }), { type: "text",
  
                                  placeholder: "输入微信公众号Secret，长度一般为32个字符" }))
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
  
                                  placeholder: "输入微信商城App密钥，长度一般为32个字符" }))
                          )
                      )
                  ),
                  payType['alipay'].enable && _react2["default"].createElement(
                      _antd.Col,
                      { span: payType['wechat'].enable ? 12 : 24 },
                      _react2["default"].createElement(
                          _antd.Card,
                          { title: "支付宝支付配置", extra: _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      { type: "primary", onClick: function () {
                                              return _this2.handleCustomer(id, 'alipay');
                                          } },
                                      "保存配置"
                                  )
                              ) },
                          _react2["default"].createElement(
                              FormItem,
                              _extends({
                                  label: "支付宝名称："
                              }, formItemLayout),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('name', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      message: '请输入支付宝名称'
                                  }]
  
                              }), { type: "text",
  
                                  placeholder: "请输入支付宝名称" }))
                          ),
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
  
                                  placeholder: "请输入合作者Id" }))
                          )
                      )
                  )
              ));
  
              return _react2["default"].createElement(
                  "div",
                  { className: "improve-container" },
                  _react2["default"].createElement(
                      "div",
                      { className: "improve-form" },
                      _react2["default"].createElement(
                          _antd.Form,
                          null,
                          _react2["default"].createElement(
                              FormItem,
                              null,
                              _react2["default"].createElement(
                                  "div",
                                  null,
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "improve-form-span-16" },
                                      "移动端商城名称"
                                  ),
                                  "  ",
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "improve-form-span-12" },
                                      "点击保存后生效"
                                  )
                              ),
                              _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('mallName', {
                                  rules: [{
                                      required: true,
                                      type: 'string',
                                      max: 8,
                                      message: '商城名称最少1个，最多8个字符'
                                  }]
  
                              }), { type: "text",
                                  style: { 'width': '353px' },
                                  placeholder: "输入商城名称，最多8个字符" })),
                              "     ",
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { type: "primary", onClick: this.handleSubmitName },
                                  "保存"
                              )
                          ),
                          _react2["default"].createElement(
                              "div",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-16" },
                                  "移动端开通模块"
                              ),
                              "  ",
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-12" },
                                  "选择移动端开通的模块，保证移动端会员的优质体验"
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Row,
                              { gutter: 16 },
                              moduleList
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              "div",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-16" },
                                  "绑定交易方式"
                              ),
                              "  ",
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-12" },
                                  "绑定交易方式，保证商品交易资金正常流转"
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Row,
                              { gutter: 16 },
                              payList
                          ),
                          _react2["default"].createElement("br", null),
                          paySelectList,
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              "div",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-20" },
                                  "客户端"
                              ),
                              _react2["default"].createElement("hr", { className: "improve-hr" })
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              "div",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-16" },
                                  "移动端链接：",
                                  link
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              "div",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { className: "improve-form-span-16" },
                                  "移动端二维码："
                              ),
                              _react2["default"].createElement("img", { style: { 'verticalAlign': 'top' }, className: "cardColorDefault",
                                  src: _commonUtilMedia2["default"].getQrcodeUrl(120, 120, link) })
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              "div",
                              { className: "improve-center", style: { 'marginBottom': '15px' } },
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { size: "large", onClick: function () {
                                          return _this2.props.handleCancel();
                                      } },
                                  "暂不设置，跳过"
                              ),
                              "     ",
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { type: "primary", size: "large", onClick: this.handleSubmit },
                                  "完成，开启营销"
                              )
                          )
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "improve-phone" },
                      _react2["default"].createElement(
                          "div",
                          { className: "improve-bg" },
                          _react2["default"].createElement(
                              "div",
                              { className: "improve-title" },
                              _react2["default"].createElement(
                                  "span",
                                  null,
                                  data.name
                              )
                          ),
                          _react2["default"].createElement(
                              "div",
                              { className: "improve-banner" },
                              _react2["default"].createElement(
                                  _antd.Row,
                                  null,
                                  colList
                              )
                          )
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "improve-phone-bottom" },
                          "移动端结构示例"
                      )
                  )
              );
          }
      }]);
  
      return ImproveForm;
  })(_react.Component);
  
  exports["default"] = createForm({
  
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          //console.log(data);
  
          if (data) {
              return {
                  mallName: {
                      value: data.mallName
                  },
  
                  wechat: {
                      value: data.payType.wechat.enable
                  },
  
                  "appid": {
                      value: data.payType.wechat.appid
                  },
                  "muchId": {
                      value: data.payType.wechat.muchId
                  },
                  "muchKey": {
                      value: data.payType.wechat.muchKey
                  },
                  "secret": {
                      value: data.payType.wechat.secret
                  },
  
                  alipay: {
                      value: data.payType.alipay.enable
                  },
  
                  "account": {
                      value: data.payType.alipay.account
                  },
                  "key": {
                      value: data.payType.alipay.key
                  },
                  "pid": {
                      value: data.payType.alipay.pid
                  },
                  "name": {
                      value: data.payType.alipay.name
                  },
  
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
  
          //console.log(props, fields);
  
          var keys = Object.keys(fields);
  
          keys.forEach(function (key) {
  
              switch (key) {
                  case 'wechat':
                      props.data.payType[key].enable = fields[key].value;
  
                      /*props.updateCustomerWechat(props.id,{
                       enable:props.data.payType[key].enable,
                       useSys:!props.data.payType[key].enable
                       });*/
  
                      break;
                  case 'alipay':
                      props.data.payType[key].enable = fields[key].value;
  
                      /*props.updateCustomerAlipay(props.id,{
                       enable:props.data.payType[key].enable,
                       useSys:!props.data.payType[key].enable
                       });*/
  
                      break;
                  case 'name':
                      props.data.name = fields[key].value;
  
                      //长度小于8直接提交！
                      /*if (props.data.name.length <= 8) {
                          props.updateMallBasic({
                              name: props.data.name
                          });
                      }*/
                      break;
                  default:
                      props.data.mallAuth[key] = (0, _commonUtil.booleanToString)(fields[key].value, 'upper');
                      break;
              }
          });
      }
  
  })(ImproveForm);
  module.exports = exports["default"];
  
  //按index排序函数
  /*{payType[imgList2[i].label].enable ? imgList2[i].desc[0] : imgList2[i].desc[1]}*/ /*<ImproveShow data={data.payType[imgList2[i].label]}
                                                                                      type={imgList2[i].label}
                                                                                      updateCustomerWechat={this.updateCustomerWechat}
                                                                                      updateCustomerAlipay={this.updateCustomerAlipay}
                                                                                      />*/

});
