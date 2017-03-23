define('platform/component/MallForm/index.jsx', function(require, exports, module) {

  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require('node_modules/react/react');
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require('node_modules/antd/dist/antd');
  
  var _commonUtil = require('common/util/index');
  
  var FormItem = _antd.Form.Item;
  var RadioGroup = _antd.Radio.Group;
  
  var MallForm = (function (_Component) {
      _inherits(MallForm, _Component);
  
      function MallForm(props) {
          _classCallCheck(this, MallForm);
  
          _get(Object.getPrototypeOf(MallForm.prototype), 'constructor', this).call(this, props);
      }
  
      _createClass(MallForm, [{
          key: 'handleSubmit',
          value: function handleSubmit() {
              var fields = this.props.form.getFieldsValue();
              var data = {
                  "id": fields["id"],
                  "uin": fields["uin"],
                  "name": fields["name"],
                  "password": fields["password"],
                  "userName": fields["userName"],
                  "contact": {
                      "name": fields["contactName"],
                      "email": fields["contactEmail"],
                      "mobile": fields["contactMobile"]
                  },
                  "mallAuth": {
                      "mallOpMode": fields["mallAuthMallOpMode"],
                      "brandAuth": (0, _commonUtil.booleanToString)(fields["mallAuthBrandAuth"], 'upper'),
                      "partnerAuth": (0, _commonUtil.booleanToString)(fields["mallAuthPartnerAuth"], 'upper'),
                      "contentAuth": (0, _commonUtil.booleanToString)(fields["mallAuthContentAuth"], 'upper'),
                      "mallAuth": (0, _commonUtil.booleanToString)(fields["mallAuthMallAuth"], 'upper'),
                      "yygAuth": (0, _commonUtil.booleanToString)(fields["mallAuthYygAuth"], 'upper')
  
                  }
              };
  
              // TODO:验证
  
              this.props.save(data);
              this.props.reset();
          }
      }, {
          key: 'render',
          value: function render() {
              var data = this.props.data;
  
              var formItemLayout = {
                  labelCol: { span: 6 },
                  wrapperCol: { span: 12 }
              };
  
              var getFieldProps = this.props.form.getFieldProps;
  
              return _react2['default'].createElement(
                  'div',
                  null,
                  _react2['default'].createElement(
                      _antd.Modal,
                      { title: '商城录入',
                          width: '560px',
                          visible: this.props.visible,
                          onOk: this.handleSubmit.bind(this),
                          onCancel: this.props.reset.bind(this) },
                      _react2['default'].createElement(
                          _antd.Form,
                          { horizontal: true },
                          _react2['default'].createElement(_antd.Input, _extends({}, getFieldProps('id', {}), { type: 'hidden' })),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: '客户编号：' }),
                              _react2['default'].createElement(_antd.Input, _extends({}, getFieldProps('uin', {}), { type: 'text' }))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '客户名称：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, getFieldProps('name', {}))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '联系人：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, getFieldProps('contactName', {}))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '联系电话：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, getFieldProps('contactMobile', {}))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '联系邮箱：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, getFieldProps('contactEmail', {}))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '登陆账号：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, getFieldProps('userName', {}))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '原始密码：'
                              }, formItemLayout),
                              _react2['default'].createElement(_antd.Input, _extends({ type: 'password' }, getFieldProps('password', {})))
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '商城运营方式：'
                              }, formItemLayout),
                              _react2['default'].createElement(
                                  RadioGroup,
                                  getFieldProps('mallAuthMallOpMode', { initialValue: 'S' }),
                                  _react2['default'].createElement(
                                      _antd.Radio,
                                      { value: 'S' },
                                      '单商城运营'
                                  ),
                                  _react2['default'].createElement(
                                      _antd.Radio,
                                      { value: 'M' },
                                      '多商城运营'
                                  )
                              )
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '合作企业授权：'
                              }, formItemLayout),
                              _react2['default'].createElement(
                                  _antd.Checkbox,
                                  getFieldProps('mallAuthBrandAuth', { valuePropName: 'checked' }),
                                  '授权'
                              )
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '品牌企业授权：'
                              }, formItemLayout),
                              _react2['default'].createElement(
                                  _antd.Checkbox,
                                  getFieldProps('mallAuthPartnerAuth', { valuePropName: 'checked' }),
                                  '授权'
                              )
                          ),
                          _react2['default'].createElement(
                              FormItem,
                              _extends({
                                  label: '功能授权：'
                              }, formItemLayout),
                              _react2['default'].createElement(
                                  _antd.Checkbox,
                                  getFieldProps('mallAuthYygAuth', { valuePropName: 'checked' }),
                                  '一元购授权'
                              ),
                              _react2['default'].createElement(
                                  _antd.Checkbox,
                                  getFieldProps('mallAuthMallAuth', { valuePropName: 'checked' }),
                                  '商城授权'
                              ),
                              _react2['default'].createElement(
                                  _antd.Checkbox,
                                  getFieldProps('mallAuthContentAuth', { valuePropName: 'checked' }),
                                  '资讯授权'
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return MallForm;
  })(_react.Component);
  
  exports['default'] = _antd.Form.create({
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data && data.id) {
              var fields = {
                  id: {
                      value: data.id
                  },
                  uin: {
                      value: data.uin
                  },
                  name: {
                      value: data.name
                  },
                  userName: {
                      value: data.userName
                  },
                  contactName: {
                      value: data.contact.name
                  },
                  contactEmail: {
                      value: data.contact.email
                  },
                  contactMobile: {
                      value: data.contact.mobile
                  },
                  mallAuthMallOpMode: {
                      value: data.mallAuth.mallOpMode
                  },
                  mallAuthBrandAuth: {
                      value: (0, _commonUtil.parseBoolean)(data.mallAuth.brandAuth)
                  },
                  mallAuthPartnerAuth: {
                      value: (0, _commonUtil.parseBoolean)(data.mallAuth.partnerAuth)
                  },
                  mallAuthContentAuth: {
                      value: (0, _commonUtil.parseBoolean)(data.mallAuth.contentAuth)
                  },
                  mallAuthMallAuth: {
                      value: (0, _commonUtil.parseBoolean)(data.mallAuth.mallAuth)
                  },
                  mallAuthYygAuth: {
                      value: (0, _commonUtil.parseBoolean)(data.mallAuth.yygAuth)
                  }
              };
              //console.log(fields)
              return fields;
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
  })(MallForm);
  module.exports = exports['default'];

});
