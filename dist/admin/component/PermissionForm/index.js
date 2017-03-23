define('admin/component/PermissionForm/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
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
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _classnames = require("node_modules/classnames/index");
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var createForm = _antd.Form.create;
  var FormItem = _antd.Form.Item;
  
  var AuthForm = (function (_Component) {
      _inherits(AuthForm, _Component);
  
      function AuthForm(props) {
          var _this = this;
  
          _classCallCheck(this, AuthForm);
  
          _get(Object.getPrototypeOf(AuthForm.prototype), "constructor", this).call(this, props);
          this.state = {};
  
          this.handleSubmit = function () {
  
              //console.log(this.props.form.getFieldsValue());
  
              var value = _this.props.form.getFieldsValue();
  
              var submitData = {
                  "brandAuth": (0, _commonUtil.booleanToString)(value.brandAuth, 'upper'),
                  "contentAuth": (0, _commonUtil.booleanToString)(value.contentAuth, 'upper'),
                  "mallAuth": (0, _commonUtil.booleanToString)(value.mallAuth, 'upper'),
                  "mallOpMode": "S",
                  "partnerAuth": (0, _commonUtil.booleanToString)(value.partnerAuth, 'upper'),
                  "yygAuth": (0, _commonUtil.booleanToString)(value.yygAuth, 'upper')
              };
  
              _this.props.mallAuth(submitData);
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
  
      _createClass(AuthForm, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var data = this.props.data;
  
              if (!data) {
                  return null;
              }
  
              var uin = this.props.uin;
  
              //console.log(uin);
              var mallAuth = data.mallAuth;
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
                                  src: '/admin/component/AuthForm/img/mall-checked.png'
                              });
                              number += 1;
                              break;
                          case 'yygAuth':
                              dataSource.push({
                                  name: '一元购',
                                  index: 1,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/yyg/linkin',
                                  src: '/admin/component/AuthForm/img/yyg-checked.png'
                              });
                              number += 1;
                              break;
                          case 'contentAuth':
                              dataSource.push({
                                  name: '内容',
                                  index: 2,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/content/linkin',
                                  src: '/admin/component/AuthForm/img/content-checked.png'
                              });
                              number += 1;
                              break;
                          case 'brandAuth':
                              dataSource.push({
                                  name: '会员',
                                  index: 3,
                                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/member/linkin',
                                  src: '/admin/component/AuthForm/img/member-checked.png'
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
                          { className: "gutter-box" },
                          _react2["default"].createElement(
                              "div",
                              null,
                              dataSource[i].name
                          )
                      )
                  ));
              }
  
              //console.log(colList);
  
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
                  },
                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/mall/linkin'
              }, {
                  name: '一元购',
                  label: 'yygAuth',
                  desc: '通过一元购的形式进行商品的售卖',
                  src: {
                      "default": '/admin/component/ImproveForm/img/yyg-default.png',
                      checked: '/admin/component/ImproveForm/img/yyg-checked.png'
                  },
                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/yyg/linkin'
              }];
  
              //构造选择模型1
              for (var i = 0; i < imgList1.length; i++) {
  
                  var fixClass = (0, _classnames2["default"])({
                      'auth-center': true,
                      'checkBoxFix': true,
                      'auth-cardColorDefault': true,
                      'auth-cardColorChange': mallAuth[imgList1[i].label] == 'TRUE'
                  });
  
                  moduleList.push(_react2["default"].createElement(
                      _antd.Col,
                      { span: 12, key: i },
                      _react2["default"].createElement(
                          "div",
                          { className: fixClass },
                          _react2["default"].createElement(
                              _antd.Checkbox,
                              getFieldProps(imgList1[i].label, {
                                  valuePropName: 'checked'
                              }),
                              _react2["default"].createElement(
                                  _antd.Row,
                                  { gutter: 16 },
                                  _react2["default"].createElement(
                                      _antd.Col,
                                      { span: 6 },
                                      _react2["default"].createElement(
                                          "div",
                                          { className: "auth-module-img" },
                                          _react2["default"].createElement("img", { src: mallAuth[imgList1[i].label] == 'TRUE' ? imgList1[i].src.checked : imgList1[i].src["default"], alt: "" })
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Col,
                                      { span: 18 },
                                      _react2["default"].createElement(
                                          "div",
                                          { style: { 'textAlign': 'left' }, className: "auth-module-div" },
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '20px', 'fontWeight': 'bolder' } },
                                                  imgList1[i].name
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '12px' } },
                                                  imgList1[i].desc
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '12px' } },
                                                  "链接：",
                                                  imgList1[i].link
                                              )
                                          )
                                      )
                                  )
                              )
                          )
                      )
                  ));
              }
  
              //模型1
  
              var moduleList2 = [];
  
              var imgList2 = [{
                  name: '内容',
                  label: 'contentAuth',
                  desc: '平台编辑内容，在客户端进行承载预览',
                  src: {
                      "default": '/admin/component/ImproveForm/img/content-default.png',
                      checked: '/admin/component/ImproveForm/img/content-checked.png'
                  },
                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/content/linkin'
              }, {
                  name: '会员',
                  label: 'brandAuth',
                  desc: '会员管理模块',
                  src: {
                      "default": '/admin/component/ImproveForm/img/member-default.png',
                      checked: '/admin/component/ImproveForm/img/member-checked.png'
                  },
                  link: _commonConfig2["default"].API_ROOT + '/entry/' + uin + '/member/linkin'
              }];
  
              //构造选择模型1
              for (var i = 0; i < imgList2.length; i++) {
  
                  var fixClass = (0, _classnames2["default"])({
                      'auth-center': true,
                      'checkBoxFix': true,
                      'auth-cardColorDefault': true,
                      'auth-cardColorChange': mallAuth[imgList2[i].label] == 'TRUE'
                  });
  
                  moduleList2.push(_react2["default"].createElement(
                      _antd.Col,
                      { span: 12, key: i },
                      _react2["default"].createElement(
                          "div",
                          { className: fixClass },
                          _react2["default"].createElement(
                              _antd.Checkbox,
                              getFieldProps(imgList2[i].label, {
                                  valuePropName: 'checked'
                              }),
                              _react2["default"].createElement(
                                  _antd.Row,
                                  { gutter: 16 },
                                  _react2["default"].createElement(
                                      _antd.Col,
                                      { span: 6 },
                                      _react2["default"].createElement(
                                          "div",
                                          { className: "auth-module-img" },
                                          _react2["default"].createElement("img", { src: mallAuth[imgList2[i].label] == 'TRUE' ? imgList2[i].src.checked : imgList2[i].src["default"], alt: "" })
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      _antd.Col,
                                      { span: 18 },
                                      _react2["default"].createElement(
                                          "div",
                                          { style: { 'textAlign': 'left' }, className: "auth-module-div" },
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '20px', 'fontWeight': 'bolder' } },
                                                  imgList2[i].name
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '12px' } },
                                                  imgList2[i].desc
                                              )
                                          ),
                                          _react2["default"].createElement(
                                              "p",
                                              null,
                                              _react2["default"].createElement(
                                                  "span",
                                                  { style: { 'fontSize': '12px' } },
                                                  "链接：",
                                                  imgList2[i].link
                                              )
                                          )
                                      )
                                  )
                              )
                          )
                      )
                  ));
              }
  
              return _react2["default"].createElement(
                  "div",
                  { className: "auth-parent-container" },
                  _react2["default"].createElement(
                      "div",
                      { className: "auth-item-list" },
                      _react2["default"].createElement(
                          "div",
                          { className: "auth-bg" },
                          _react2["default"].createElement(
                              "div",
                              { className: "auth-banner" },
                              _react2["default"].createElement(
                                  _antd.Row,
                                  null,
                                  colList
                              )
                          )
                      ),
                      _react2["default"].createElement(
                          "div",
                          { className: "auth-phone-bottom" },
                          "移动端结构示例"
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "auth-form" },
                      _react2["default"].createElement(
                          _antd.Form,
                          null,
                          _react2["default"].createElement(
                              _antd.Row,
                              { gutter: 16 },
                              moduleList
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Row,
                              { gutter: 16 },
                              moduleList2
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Row,
                              null,
                              _react2["default"].createElement(
                                  _antd.Col,
                                  { span: 24, style: { 'textAlign': 'center' } },
                                  _react2["default"].createElement(
                                      _antd.Button,
                                      { type: "primary", size: "large", onClick: function () {
                                              return _this2.handleSubmit();
                                          } },
                                      "提交"
                                  )
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return AuthForm;
  })(_react.Component);
  
  exports["default"] = createForm({
  
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          //console.log(data);
  
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
  
          // console.log(props.data.mallAuth['brandAuth']);
  
          keys.forEach(function (key) {
  
              props.data.mallAuth[key] = (0, _commonUtil.booleanToString)(fields[key].value, 'upper');
          });
  
          //联动，不确定是否有效
          if (props.data.mallAuth['mallAuth'] == 'TRUE' || props.data.mallAuth['yygAuth'] == 'TRUE') {
  
              props.data.mallAuth['brandAuth'] = 'TRUE';
          }
      }
  
  })(AuthForm);
  module.exports = exports["default"];
  
  //按index排序函数
  /*<div>
  <img src={dataSource[i].src} alt="" className="gutter-box-img"/>
  </div>*/ /*<div>
              <div className="auth-module-div">
                  <img src={imgList2[i].src} alt=""/>
                  &nbsp;&nbsp;
                  <span>{imgList2[i].name}</span>
              </div>
              <div>
                  <span className="auth-module-span">{imgList2[i].desc}</span>
              </div>
           </div>*/

});
