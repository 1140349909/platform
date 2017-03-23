define('admin/component/CompanyShowForm/index.jsx', function(require, exports, module) {

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
  
  var _redux = require("node_modules/redux/lib/index");
  
  var _reactRedux = require("node_modules/react-redux/lib/index");
  
  var _jquery = require('node_modules/jquery/dist/jquery');
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _commonUtilMedia = require('common/util/media');
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonConfig = require('common/config/index');
  
  var _commonConfig2 = _interopRequireDefault(_commonConfig);
  
  var _commonComponentUEditor = require('common/component/UEditor/index.jsx');
  
  '';
  
  var confirm = _antd.Modal.confirm;
  var InputGroup = _antd.Input.Group;
  var FormItem = _antd.Form.Item;
  var EDITOR_ID = 'contentEditor';
  
  // 修改/新增客户
  
  var CompanyFormCustomer = (function (_Component) {
      _inherits(CompanyFormCustomer, _Component);
  
      function CompanyFormCustomer(props) {
          var _this = this;
  
          _classCallCheck(this, CompanyFormCustomer);
  
          _get(Object.getPrototypeOf(CompanyFormCustomer.prototype), "constructor", this).call(this, props);
          this.state = {
              logoId: '',
              type: true
          };
  
          this.handleSubmitClick = function () {
  
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  }
  
                  _this.props.doCustomer(_this.handleSubmit());
                  _this.setState({
                      type: true
                  });
              });
          };
  
          this.handleReturn = function () {
              _this.props.reset();
              _this.setState({
                  type: true
              });
          };
  
          this.handleSubmit = function (e) {
  
              var fieldsValue = _this.props.form.getFieldsValue();
  
              return {
                  id: fieldsValue.id || '',
                  name: fieldsValue.name,
                  logo: fieldsValue.logo.file.response.data,
                  contact: {
                      mobile: fieldsValue.contactMobile,
                      name: fieldsValue.contactName,
                      email: fieldsValue.contactEmail
                  }
              };
          };
  
          this.isPhone = function (rule, value, callback) {
              var testPhone = /^(13|15|18|17)[0-9]{9}$/;
              if (!testPhone.test(value)) {
                  callback();
              } else {
                  callback();
              }
          };
      }
  
      _createClass(CompanyFormCustomer, [{
          key: "componentWillReceiveProps",
  
          // 接收获取产品信息,图片src
          value: function componentWillReceiveProps(nextProps) {
              if (nextProps.data.type == 'add' && this.state.type) {
                  this.setState({
                      type: false,
                      logoId: ''
                  });
              } else if (nextProps.data.type == 'modify' && this.state.type) {
                  this.setState({
                      type: false,
                      logoId: nextProps.data.logo
                  });
              }
          }
      }, {
          key: "onChange",
  
          // upload 改变时处理函数
          value: function onChange(info) {
              if (info.file.status === 'done') {
                  if (info.file.response.errCode === 0) {
                      this.setState({
                          logoId: info.file.response.data
                      });
                  }
              }
          }
      }, {
          key: "render",
          value: function render() {
  
              // 获取表单相关API
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              var visible = this.props.type === 'showCustomer' ? true : false;
  
              var idProps = getFieldProps('id');
  
              var nameProps = getFieldProps('name', {
                  rules: [{ required: true, message: '请输入企业名称' }]
              });
  
              var contactNameProps = getFieldProps('contactName', {
                  rules: [{ required: true, message: '请输入企业联系人' }]
              });
  
              var contactMobileProps = getFieldProps('contactMobile', {
                  rules: [{ required: true, message: '请输入联系电话' }, { validator: this.isPhone }]
              });
  
              var contactEmailProps = getFieldProps('contactEmail', {
                  rules: [{ type: 'email', required: true, message: '请输入联系邮箱' }]
              });
  
              var uploadProps = {
                  name: 'media',
                  showUploadList: false,
                  withCredentials: true,
                  action: _commonUtilMedia2["default"].upLoad
              };
  
              var logoProps = getFieldProps('logo', {
                  onChange: this.onChange.bind(this),
                  rules: [{ required: true, message: '请上传主图', type: 'object' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              var logoId = this.state.logoId;
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  {
                      title: "客户信息",
                      visible: visible,
                      onCancel: this.props.reset,
                      footer: [_react2["default"].createElement(
                          _antd.Button,
                          {
                              key: "back",
                              type: "ghost",
                              size: "large",
                              onClick: this.handleReturn },
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
                      { horizontal: true },
                      _react2["default"].createElement(
                          FormItem,
                          null,
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              style: { display: 'none' }
                          }, idProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "企业名称："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "企业名称"
                          }, nameProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "企业联系人："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "企业联系人"
                          }, contactNameProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "联系电话："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "联系电话"
                          }, contactMobileProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "联系邮箱："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "联系邮箱"
                          }, contactEmailProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "企业LOGO："
                          }, formItemLayout),
                          _react2["default"].createElement(
                              _antd.Upload,
                              _extends({
                                  className: "companyshowform-img"
                              }, uploadProps, logoProps),
                              logoId == '' && _react2["default"].createElement(
                                  "div",
                                  { className: "companyshowform-img-text" },
                                  _react2["default"].createElement(_antd.Icon, { className: "companyshowform-img-icon", type: "upload" }),
                                  _react2["default"].createElement(
                                      "p",
                                      { className: "companyshowform-img-p" },
                                      "点击上传logo"
                                  )
                              ),
                              logoId !== '' && _react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getMediaUrl(logoId) })
                          )
                      )
                  )
              );
          }
      }]);
  
      return CompanyFormCustomer;
  })(_react.Component);
  
  var _CompanyFormCustomer = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data.type == 'modify') {
  
              var logo = {
                  file: {
                      response: {
                          data: data.logo
                      }
                  }
              };
  
              return {
                  id: {
                      value: data.id
                  },
                  name: {
                      value: data.name
                  },
                  logo: {
                      value: logo
                  },
                  contactName: {
                      value: data.contact.name
                  },
                  contactMobile: {
                      value: data.contact.mobile
                  },
                  contactEmail: {
                      value: data.contact.email
                  }
  
              };
          } else {
              return {};
          }
      }
  })(CompanyFormCustomer);
  
  // 修改/新增员工
  
  var CompanyFormEmployee = (function (_Component2) {
      _inherits(CompanyFormEmployee, _Component2);
  
      function CompanyFormEmployee(props) {
          var _this2 = this;
  
          _classCallCheck(this, CompanyFormEmployee);
  
          _get(Object.getPrototypeOf(CompanyFormEmployee.prototype), "constructor", this).call(this, props);
  
          this.handleSubmitClick = function () {
              _this2.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      return;
                  }
                  _this2.props.doEmployee(_this2.handleSubmit());
              });
          };
  
          this.handleSubmit = function (e) {
  
              var fieldsValue = _this2.props.form.getFieldsValue();
  
              return {
                  id: fieldsValue.id || '',
                  uin: _this2.props.data.uin || '',
                  customerId: _this2.props.data.customerId || '',
                  name: fieldsValue.name,
                  jobNo: fieldsValue.jobNo,
                  mobile: fieldsValue.mobile,
                  store: {
                      name: fieldsValue.storeName
                  }
              };
          };
      }
  
      _createClass(CompanyFormEmployee, [{
          key: "render",
          value: function render() {
  
              // 获取表单相关API
              var _props$form2 = this.props.form;
              var getFieldProps = _props$form2.getFieldProps;
              var getFieldError = _props$form2.getFieldError;
              var isFieldValidating = _props$form2.isFieldValidating;
  
              var visible = this.props.type === 'showEmployee' ? true : false;
  
              var idProps = getFieldProps('id');
  
              var jobNoProps = getFieldProps('jobNo', {
                  rules: [{ required: true, message: '请输入员工编号/工号' }]
              });
  
              var nameProps = getFieldProps('name', {
                  rules: [{ required: true, message: '请输入姓名' }]
              });
  
              var mobileProps = getFieldProps('mobile', {
                  rules: [{ required: true, message: '请输入手机号码' }]
              });
  
              var storeNameProps = getFieldProps('storeName', {
                  rules: [{ required: true, message: '请输入所属门店' }]
              });
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  {
                      title: "客户信息",
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
                      _react2["default"].createElement(
                          FormItem,
                          null,
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              style: { display: 'none' }
                          }, idProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "员工编号/工号："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "请输入员工编号/工号"
                          }, jobNoProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "姓名："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "请输入姓名"
                          }, nameProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "手机号码："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "请输入手机号码"
                          }, mobileProps))
                      ),
                      _react2["default"].createElement(
                          FormItem,
                          _extends({
                              label: "所属门店："
                          }, formItemLayout),
                          _react2["default"].createElement(_antd.Input, _extends({ type: "text",
                              placeholder: "请输入所属门店"
                          }, storeNameProps))
                      )
                  )
              );
          }
      }]);
  
      return CompanyFormEmployee;
  })(_react.Component);
  
  var _CompanyFormEmployee = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {
          var data = props.data;
  
          if (data.type == 'modify') {
              return {
                  id: {
                      value: data.id
                  },
                  jobNo: {
                      value: data.jobNo
                  },
                  name: {
                      value: data.name
                  },
                  mobile: {
                      value: data.mobile
                  },
                  storeName: {
                      value: data.store.name
                  }
  
              };
          } else {
              return {};
          }
      }
  })(CompanyFormEmployee);
  
  // 导入客户员工
  
  var CompanyFormCustomerImport = (function (_Component3) {
      _inherits(CompanyFormCustomerImport, _Component3);
  
      function CompanyFormCustomerImport(props) {
          _classCallCheck(this, CompanyFormCustomerImport);
  
          _get(Object.getPrototypeOf(CompanyFormCustomerImport.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(CompanyFormCustomerImport, [{
          key: "handleSubmit",
          value: function handleSubmit(e) {
  
              e.preventDefault();
  
              // const fieldsValue = this.props.form.getFieldsValue(),
              //       id = this.props.id;
  
              // this.props.handleConfirm(fieldsValue, id,  2)
          }
      }, {
          key: "render",
          value: function render() {
  
              var props = {
                  name: 'file',
                  action: _commonUtilMedia2["default"].customerDataImport + this.props.id,
                  withCredentials: true,
                  onChange: function onChange(info) {
                      if (info.file.status !== 'uploading') {
                          //console.log(info.file, info.fileList);
                      }
  
                      if (info.file.status === 'done') {
                          message.success(info.file.name + " 上传成功。");
                      } else if (info.file.status === 'error') {
                          message.error(info.file.name + " 上传失败。");
                      }
                  }
              };
  
              var visible = this.props.type === 'showCustomerImport' ? true : false;
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  {
                      title: "导入客户员工",
                      visible: visible,
                      onCancel: this.props.reset,
                      footer: [_react2["default"].createElement(
                          _antd.Button,
                          {
                              key: "back",
                              type: "ghost",
                              size: "large",
                              onClick: this.props.reset },
                          "确定"
                      )] },
                  _react2["default"].createElement(
                      _antd.Form,
                      { horizontal: true, onSubmit: this.handleSubmit.bind(this) },
                      _react2["default"].createElement(
                          FormItem,
                          formItemLayout,
                          _react2["default"].createElement(
                              _antd.Upload,
                              props,
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { type: "ghost" },
                                  _react2["default"].createElement(_antd.Icon, { type: "upload" }),
                                  " 上传客员工.csv文件"
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return CompanyFormCustomerImport;
  })(_react.Component);
  
  var _CompanyFormCustomerImport = CompanyFormCustomerImport;
  
  // 导入客户门店
  
  var CompanyFormStoreImport = (function (_Component4) {
      _inherits(CompanyFormStoreImport, _Component4);
  
      function CompanyFormStoreImport(props) {
          _classCallCheck(this, CompanyFormStoreImport);
  
          _get(Object.getPrototypeOf(CompanyFormStoreImport.prototype), "constructor", this).call(this, props);
      }
  
      _createClass(CompanyFormStoreImport, [{
          key: "handleSubmit",
          value: function handleSubmit(e) {
  
              e.preventDefault();
  
              // const fieldsValue = this.props.form.getFieldsValue(),
              //       id = this.props.id;
  
              // this.props.handleConfirm(fieldsValue, id,  2)
          }
      }, {
          key: "render",
          value: function render() {
  
              var visible = this.props.type === 'showStoreImport' ? true : false;
  
              var formItemLayout = {
                  labelCol: { span: 7 },
                  wrapperCol: { span: 14 }
              };
  
              var props = {
                  name: 'file',
                  action: _commonUtilMedia2["default"].customerStoreImport + this.props.id,
                  withCredentials: true,
                  onChange: function onChange(info) {
                      if (info.file.status !== 'uploading') {
                          //console.log(info.file, info.fileList);
                      }
  
                      if (info.file.status === 'done') {
                          message.success(info.file.name + " 上传成功。");
                      } else if (info.file.status === 'error') {
                          message.error(info.file.name + " 上传失败。");
                      }
                  }
              };
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  {
                      title: "导入客户门店",
                      visible: visible,
                      onCancel: this.props.reset,
                      footer: [_react2["default"].createElement(
                          _antd.Button,
                          {
                              key: "back",
                              type: "ghost",
                              size: "large",
                              onClick: this.props.reset },
                          "确定"
                      )] },
                  _react2["default"].createElement(
                      _antd.Form,
                      { horizontal: true, onSubmit: this.handleSubmit.bind(this) },
                      _react2["default"].createElement(
                          FormItem,
                          formItemLayout,
                          _react2["default"].createElement(
                              _antd.Upload,
                              props,
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { type: "ghost" },
                                  _react2["default"].createElement(_antd.Icon, { type: "upload" }),
                                  " 上传客户门店.csv文件"
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      return CompanyFormStoreImport;
  })(_react.Component);
  
  var _CompanyFormStoreImport = CompanyFormStoreImport;
  
  // 员工激励
  
  var CompanyFormExcitation = (function (_Component5) {
      _inherits(CompanyFormExcitation, _Component5);
  
      function CompanyFormExcitation(props) {
          var _this3 = this;
  
          _classCallCheck(this, CompanyFormExcitation);
  
          _get(Object.getPrototypeOf(CompanyFormExcitation.prototype), "constructor", this).call(this, props);
  
          this.handleSubmitClick = function (e) {
              var content = (0, _commonComponentUEditor.getEditorValue)(EDITOR_ID);
              _this3.props.doExcitation({
                  content: content
              });
              _this3.props.reset();
          };
      }
  
      _createClass(CompanyFormExcitation, [{
          key: "componentWillUpdate",
          value: function componentWillUpdate(nextProps) {
              (0, _commonComponentUEditor.setEditorValue)(EDITOR_ID, nextProps.data);
          }
      }, {
          key: "render",
          value: function render() {
              var visible = this.props.type === 'showExcitation' ? true : false;
  
              return _react2["default"].createElement(
                  _antd.Modal,
                  {
                      width: "700px",
                      title: "员工激励设置",
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
                  _react2["default"].createElement(_commonComponentUEditor.Editor, { id: EDITOR_ID, height: "500px" })
              );
          }
      }]);
  
      return CompanyFormExcitation;
  })(_react.Component);
  
  var _CompanyFormExcitation = _antd.Form.create({
  
      // 把 props 转为对应的值，可用于把 Redux store 中的值读出
      mapPropsToFields: function mapPropsToFields(props) {}
  })(CompanyFormExcitation);
  
  exports.CompanyFormCustomer = _CompanyFormCustomer;
  exports.CompanyFormEmployee = _CompanyFormEmployee;
  exports.CompanyFormCustomerImport = _CompanyFormCustomerImport;
  exports.CompanyFormStoreImport = _CompanyFormStoreImport;
  exports.CompanyFormExcitation = _CompanyFormExcitation;
  /*<a className="company-importbtn">下载excel表格模板</a>*/ /*<a className="company-importbtn">下载excel表格模板</a>*/

});
