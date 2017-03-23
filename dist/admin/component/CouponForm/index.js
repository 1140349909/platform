define('admin/component/CouponForm/index.jsx', function(require, exports, module) {

  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
      value: true
  });
  
  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _react = require("node_modules/react/react");
  
  var _react2 = _interopRequireDefault(_react);
  
  var _antd = require("node_modules/antd/dist/antd");
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var _reactRouter = require("node_modules/react-router/lib/index");
  
  var FormItem = _antd.Form.Item;
  var Option = _antd.Select.Option;
  var RadioButton = _antd.Radio.Button;
  var RadioGroup = _antd.Radio.Group;
  var RangePicker = _antd.DatePicker.RangePicker;
  
  var CouponForm = (function (_Component) {
      _inherits(CouponForm, _Component);
  
      function CouponForm(props) {
          var _this = this;
  
          _classCallCheck(this, _CouponForm);
  
          _get(Object.getPrototypeOf(_CouponForm.prototype), "constructor", this).call(this, props);
          this.state = {
              startValue: null,
              endValue: null,
  
              intervalStartDate: '20xx-xx-xx',
              intervalEndDate: '20xx-xx-xx'
          };
  
          this.handleReset = function (e) {
  
              e.preventDefault();
  
              _this.props.form.resetFields();
          };
  
          this.handleSubmit = function (e) {
  
              e.preventDefault();
  
              _this.props.form.validateFieldsAndScroll(function (errors, values) {
                  if (!!errors) {
                      return;
                  } else {
                      //const formData = this.props.form.getFieldsValue();
  
                      //rangePicker
                      values.intervalStartDate = _this.state.intervalStartDate != '' ? _this.state.intervalStartDate : undefined;
                      values.intervalEndDate = _this.state.intervalEndDate != '' ? _this.state.intervalEndDate : undefined;
  
                      // 校验
                      switch (values.totalType) {
                          case 'infinity':
                              values.total = -1;
                              break;
                          case 'finity':
                              if (values.total == undefined || values.total == '') {
                                  _antd.notification.warning({
                                      message: '警告',
                                      description: '请输入券总量！'
                                  });
                                  return;
                              }
                              break;
  
                      }
  
                      switch (values.periodType) {
                          case 'dynamic':
                              if (values.dynamicBegin == undefined || values.dynamicEnd == undefined) {
                                  _antd.notification.warning({
                                      message: '警告',
                                      description: '请选择时间范围！'
                                  });
                                  return;
                              }
                              break;
                          case 'interval':
                              if (values.intervalStartDate == undefined || values.intervalEndDate == undefined) {
                                  _antd.notification.warning({
                                      message: '警告',
                                      description: '请选择固定日期！'
                                  });
                                  return;
                              }
                              break;
  
                      }
  
                      if (values.total == 0) {
                          _antd.notification.warning({
                              message: '警告',
                              description: '券总数不能为0！'
                          });
                          return;
                      }
  
                      //建模
                      var formData = {
                          "couponType": values.couponType,
  
                          "name": values.name,
                          "rule": {
                              "give": {
                                  "charge": {
                                      "enable": values.chargeEnable,
                                      "min": values.chargeMin * 100
                                  },
                                  "period": {
                                      "dynamic": {
                                          "enable": values.periodType == 'dynamic',
                                          "begin": values.dynamicBegin,
                                          "end": values.dynamicEnd
                                      },
                                      "interval": {
                                          "enable": values.periodType == 'interval',
                                          "startDate": values.intervalStartDate,
                                          "endDate": values.intervalEndDate
                                      }
                                  }
                              },
                              "receive": {
                                  "perTotal": values.receivePerTotal
                              }
                          },
                          "total": values.total
                      };
  
                      switch (values.couponType) {
                          case 'discount':
                              formData.discount = values.discount;
                              break;
                          case 'quota':
                              formData.faceValue = values.faceValue * 100;
                              break;
  
                      }
  
                      if (values.chargeEnable) {
                          if (values.chargeMin == undefined) {
                              _antd.notification.warning({
                                  message: '警告',
                                  description: '请输入最低消费金额！'
                              });
                              return;
                          }
                      } else {}
                      // delete formData.rule.give.charge.min;
  
                      // 验证
                      _this.props.save(formData);
  
                      // 跳转
                      _this.props.jumpBack();
                  }
              });
          };
  
          this.setFaceValue = function (data) {
  
              _this.props.form.setFieldsValue({
                  'faceValue': data
              });
          };
  
          this.disabledStartDate = function (startValue) {
  
              var dd = new Date();
              //dd.setDate(dd.getDate()-1);
              var y = dd.getFullYear();
              var m = dd.getMonth(); //获取当前月份的日期
              var d = dd.getDate();
  
              var ss = new Date(new Date(y, m, d).getTime());
  
              if (!startValue || !_this.state.endValue) {
                  return startValue.getTime() <= ss.getTime();
              }
  
              return startValue.getTime() <= ss.getTime() || startValue.getTime() >= _this.state.endValue.getTime();
  
              // return (Date.now() >= startValue.getTime() >= this.state.endValue.getTime());
          };
  
          this.disabledEndDate = function (endValue) {
  
              var dd = new Date();
              //dd.setDate(dd.getDate()-1);
              var y = dd.getFullYear();
              var m = dd.getMonth(); //获取当前月份的日期
              var d = dd.getDate();
  
              // 86400000
  
              var ss = new Date(new Date(y, m, d).getTime());
  
              if (!endValue || !_this.state.startValue) {
                  return endValue.getTime() <= ss.getTime();
              }
  
              return endValue.getTime() <= _this.state.startValue.getTime() || endValue.getTime() <= ss.getTime();
          };
  
          this.onChange = function (field, value) {
              _this.setState(_defineProperty({}, field, value));
  
              if (value != undefined) {
                  switch (field) {
                      case 'startValue':
                          _this.props.form.setFieldsValue({
                              'intervalStartDate': (0, _commonUtilIndex.dateFormat)(value, 'yyyy-MM-dd')
                          });
                          break;
                      case 'endValue':
                          _this.props.form.setFieldsValue({
                              'intervalEndDate': (0, _commonUtilIndex.dateFormat)(value, 'yyyy-MM-dd')
                          });
                          break;
  
                  }
              }
          };
  
          this.onStartChange = function (value) {
              _this.onChange('startValue', value);
          };
  
          this.onEndChange = function (value) {
              _this.onChange('endValue', value);
          };
  
          this.rangeOnChange = function (value, dateString) {
  
              _this.setState({
                  intervalStartDate: dateString[0] != '' ? dateString[0] : '20xx-xx-xx',
                  intervalEndDate: dateString[1] != '' ? dateString[1] : '20xx-xx-xx'
              });
          };
  
          this.disabledDate = function (value) {
  
              var dd = new Date();
              //dd.setDate(dd.getDate()-1);
              var y = dd.getFullYear();
              var m = dd.getMonth(); //获取当前月份的日期
              var d = dd.getDate();
  
              var ss = new Date(new Date(y, m, d).getTime());
  
              return value && value.getTime() < ss.getTime();
          };
  
          this.validRangeDate = function (addValue) {
  
              var dd = new Date();
              //dd.setDate(dd.getDate()-1);
              var y1 = dd.getFullYear();
              var m1 = dd.getMonth(); //获取当前月份的日期
              var d1 = dd.getDate();
              //获取日期时间，1天的毫秒数是86400000
              var ss = new Date(new Date(y1, m1, d1).getTime() + 86400000 * addValue);
              //日期格式化
              var y2 = ss.getFullYear();
              var m2 = ss.getMonth() + 1 < 10 ? '0' + (ss.getMonth() + 1).toString() : ss.getMonth() + 1; //获取当前月份的日期
              var d2 = ss.getDate() < 10 ? '0' + ss.getDate().toString() : ss.getDate();
  
              return y2 + '-' + m2 + '-' + d2;
          };
      }
  
      _createClass(CouponForm, [{
          key: "render",
          value: function render() {
              var _this2 = this;
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              var _props$form = this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              //定义优惠券面值模型
  
              var faceValueModel = this.props.list;
  
              var faceValueLength = faceValueModel.length;
  
              if (!faceValueModel) {
                  return null;
              }
  
              if (faceValueLength > 5) {
                  faceValueLength = 5;
              }
  
              var selectList = [];
  
              var _loop = function (i) {
  
                  var data = faceValueModel[i] / 100;
  
                  selectList.push(_react2["default"].createElement(
                      _antd.Button,
                      { key: i,
                          className: "button-style",
                          onClick: function () {
                              return _this2.setFaceValue(data);
                          } },
                      data + '元'
                  ));
              };
  
              for (var i = 0; i < faceValueLength; i++) {
                  _loop(i);
              }
  
              return _react2["default"].createElement(
                  "div",
                  { style: { 'marginTop': '50px', 'width': '1200px' } },
                  _react2["default"].createElement(
                      "div",
                      { className: "coupon-bg" },
                      _react2["default"].createElement(
                          "span",
                          { className: "coupon-face-value" },
                          this.props.couponData.couponType == 'quota' && _react2["default"].createElement(
                              "span",
                              null,
                              "￥",
                              _react2["default"].createElement(
                                  "span",
                                  { style: { 'fontSize': '16px' } },
                                  this.props.couponData.faceValue
                              ),
                              "元"
                          ),
                          this.props.couponData.couponType == 'discount' && _react2["default"].createElement(
                              "span",
                              null,
                              _react2["default"].createElement(
                                  "span",
                                  { style: { 'fontSize': '16px' } },
                                  this.props.couponData.discount
                              ),
                              "折"
                          )
                      ),
                      _react2["default"].createElement(
                          "span",
                          { className: "coupon-type" },
                          this.props.couponData.couponType == 'quota' && _react2["default"].createElement(
                              "span",
                              null,
                              "定额优惠券"
                          ),
                          this.props.couponData.couponType == 'discount' && _react2["default"].createElement(
                              "span",
                              null,
                              "折扣优惠券"
                          )
                      ),
                      _react2["default"].createElement(
                          "span",
                          { className: "coupon-platform" },
                          "平台通用"
                      ),
                      this.props.couponData.chargeEnable && _react2["default"].createElement(
                          "span",
                          { className: "coupon-limit" },
                          '满￥' + this.props.couponData.chargeMin + '元可用'
                      ),
                      this.props.couponData.periodType == 'interval' && _react2["default"].createElement(
                          "div",
                          { className: "coupon-period-type" },
                          this.state.intervalStartDate,
                          _react2["default"].createElement(
                              "span",
                              null,
                              "至"
                          ),
                          this.state.intervalEndDate
                      ),
                      this.props.couponData.periodType == 'dynamic' && _react2["default"].createElement(
                          "div",
                          { className: "coupon-period-type" },
                          this.validRangeDate(this.props.couponData.dynamicBegin),
                          _react2["default"].createElement(
                              "span",
                              null,
                              "至"
                          ),
                          this.validRangeDate(this.props.couponData.dynamicEnd)
                      )
                  ),
                  _react2["default"].createElement(
                      "div",
                      { className: "coupon-form" },
                      _react2["default"].createElement(
                          _antd.Form,
                          { horizontal: true },
                          _react2["default"].createElement(
                              _antd.Card,
                              { title: "基本信息" },
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "优惠券类型" }),
                                  _react2["default"].createElement(
                                      _antd.Select,
                                      _extends({}, getFieldProps('couponType', {
  
                                          rules: [{
                                              required: true,
                                              message: '请选择优惠券类型'
                                          }]
                                      }), { placeholder: "优惠券类型", style: { width: 100 } }),
                                      _react2["default"].createElement(
                                          Option,
                                          { value: "discount" },
                                          "折扣优惠券"
                                      ),
                                      _react2["default"].createElement(
                                          Option,
                                          { value: "quota" },
                                          "定额优惠券"
                                      )
                                  )
                              ),
                              this.props.couponData.couponType == 'discount' && _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "折扣额度：",
                                      help: "折扣值为1-9.9的数字" }),
                                  _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('discount', {
                                      rules: [{
                                          type: 'number',
                                          required: true,
                                          max: 9.9,
                                          message: '请输入折扣，最大9.9折'
                                      }]
                                  }), {
                                      style: { width: 100 },
                                      step: 0.1,
                                      min: 1,
                                      placeholder: "输入折扣",
                                      autoComplete: "off" })),
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "ant-form-text" },
                                      " 折，最大9.9折"
                                  )
                              ),
                              this.props.couponData.couponType == 'quota' && _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "优惠额度：" }),
                                  _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('faceValue', {
                                      rules: [{
                                          type: 'number',
                                          required: true,
                                          max: 5000,
                                          message: '请输入金额，最大值5000元'
                                      }]
                                  }), {
                                      style: { width: 100 },
                                      step: 0.01,
                                      min: 0,
                                      placeholder: "输入金额",
                                      autoComplete: "off" })),
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "ant-form-text" },
                                      " 元，最大值5000元"
                                  ),
                                  _react2["default"].createElement(
                                      "p",
                                      { id: "faceValue", name: "faceValue" },
                                      "已有红包额度      ",
                                      selectList
                                  )
                              ),
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "券名称：",
                                      help: "建议填写代金券“减免金额”及自定义内容，描述卡券提供的具体优惠" }),
                                  _react2["default"].createElement(_antd.Input, _extends({}, getFieldProps('name', {
                                      rules: [{
                                          type: 'string',
                                          required: true,
                                          message: '请输入名称，且不超过24个字符',
                                          min: 1,
                                          max: 24
                                      }]
                                  }), {
                                      style: { width: 300 },
                                      placeholder: "输入名称",
                                      autoComplete: "off" })),
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "ant-form-text", id: "name", name: "name" },
                                      "  ",
                                      this.props.couponData.name ? this.props.couponData.name.length : 0,
                                      "/24"
                                  )
                              ),
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "券总量：" }),
                                  _react2["default"].createElement(
                                      RadioGroup,
                                      getFieldProps('totalType', {
                                          initialValue: 'infinity',
                                          exclusive: true,
                                          rules: [{
                                              required: true,
                                              message: '请选择类型'
                                          }]
                                      }),
                                      _react2["default"].createElement(
                                          _antd.Radio,
                                          { key: "c", value: "infinity" },
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text" },
                                              "不限"
                                          )
                                      ),
                                      _react2["default"].createElement(
                                          _antd.Radio,
                                          { key: "b", value: "finity" },
                                          _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('total'), {
                                              style: { width: 100 },
                                              min: 1,
                                              disabled: this.props.form.getFieldProps('totalType').value != 'finity',
                                              placeholder: "输入数量" })),
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text", id: "total", name: "total" },
                                              "  张"
                                          )
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Card,
                              { title: "适用设置" },
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "适用期限：" }),
                                  _react2["default"].createElement(
                                      RadioGroup,
                                      getFieldProps('periodType', {
                                          initialValue: 'interval',
                                          exclusive: true,
                                          rules: [{
                                              required: true,
                                              message: '请选择类型'
                                          }]
                                      }),
                                      _react2["default"].createElement(
                                          _antd.Radio,
                                          { key: "a", value: "interval" },
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text", id: "periodType", name: "periodType" },
                                              "固定日期"
                                          )
                                      ),
                                      _react2["default"].createElement(
                                          "div",
                                          { style: { 'display': 'inline-block' } },
                                          _react2["default"].createElement(RangePicker, {
                                              style: { width: 184 },
                                              disabledDate: this.disabledDate,
                                              disabled: this.props.form.getFieldProps('periodType').value != 'interval',
                                              format: "yyyy-MM-dd",
                                              onChange: this.rangeOnChange })
                                      ),
                                      _react2["default"].createElement("br", null),
                                      _react2["default"].createElement(
                                          _antd.Radio,
                                          { key: "b", value: "dynamic" },
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text", id: "periodType", name: "periodType" },
                                              "领券后，"
                                          )
                                      ),
                                      _react2["default"].createElement(
                                          "div",
                                          { style: { 'display': 'inline-block' } },
                                          _react2["default"].createElement(_antd.InputNumber, _extends({ style: { width: 100 },
                                              disabled: this.props.form.getFieldProps('periodType').value != 'dynamic'
                                          }, getFieldProps('dynamicBegin', {
                                              initialValue: 0,
                                              rules: [{
                                                  type: 'number',
                                                  required: true,
                                                  message: '请输入数字'
                                              }]
                                          }), {
  
                                              min: 0,
                                              placeholder: "输入数字" })),
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text", id: "dynamicBegin", name: "dynamicBegin" },
                                              "  天后生效，  "
                                          ),
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text", id: "dynamicEnd", name: "dynamicEnd" },
                                              "有效天数"
                                          ),
                                          _react2["default"].createElement(_antd.InputNumber, _extends({ style: { width: 100 },
                                              disabled: this.props.form.getFieldProps('periodType').value != 'dynamic'
                                          }, getFieldProps('dynamicEnd', {
                                              initialValue: 1,
                                              rules: [{
                                                  type: 'number',
                                                  required: true,
                                                  message: '请输入数字'
                                              }]
                                          }), {
  
                                              min: 1,
                                              placeholder: "输入数字" })),
                                          _react2["default"].createElement(
                                              "span",
                                              { className: "ant-form-text" },
                                              "  天"
                                          )
                                      )
                                  )
                              ),
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "适用限制：" }),
                                  _react2["default"].createElement(
                                      _antd.Checkbox,
                                      _extends({}, getFieldProps('chargeEnable', { initialValue: false }), {
                                          className: "ant-checkbox-horizontal" }),
                                      _react2["default"].createElement(
                                          "span",
                                          { className: "ant-form-text", id: "chargeEnable",
                                              name: "chargeEnable" },
                                          "最低消费  "
                                      )
                                  ),
                                  _react2["default"].createElement(
                                      "div",
                                      { style: { 'display': 'inline-block' } },
                                      _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('chargeMin'), {
                                          style: { width: 100 },
                                          min: 1,
                                          step: 0.01,
                                          disabled: !this.props.form.getFieldProps('chargeEnable').value,
                                          defaultValue: 0,
                                          placeholder: "输入金额",
                                          autoComplete: "off" })),
                                      _react2["default"].createElement(
                                          "span",
                                          { className: "ant-form-text", id: "chargeMin", name: "chargeMin" },
                                          " 元适用"
                                      )
                                  )
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              _antd.Card,
                              { title: "领券设置" },
                              _react2["default"].createElement(
                                  FormItem,
                                  _extends({}, formItemLayout, {
                                      label: "限领数量：" }),
                                  _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('receivePerTotal', {
                                      initialValue: 1,
                                      rules: [{
                                          type: 'number',
                                          required: true,
                                          message: '请输入数量，且不超过券总量',
                                          min: 1,
                                          max: this.props.couponData.total != -1 && this.props.couponData.total != 0 ? this.props.couponData.total : Infinity
                                      }]
  
                                  }), {
                                      style: { width: 100 },
                                      min: 1,
                                      placeholder: "输入数量",
                                      autoComplete: "off" })),
                                  _react2["default"].createElement(
                                      "span",
                                      { className: "ant-form-text", id: "receivePerTotal", name: "receivePerTotal" },
                                      "每个用户领券数量，默认为1"
                                  )
                              )
                          ),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement("br", null),
                          _react2["default"].createElement(
                              FormItem,
                              { wrapperCol: { span: 16, offset: 8 }, style: { marginTop: 24 } },
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { className: "button-style", type: "primary", onClick: this.handleSubmit },
                                  "保存"
                              ),
                              _react2["default"].createElement(
                                  _antd.Button,
                                  { className: "button-style", onClick: this.props.jumpBack },
                                  "取消"
                              )
                          )
                      )
                  )
              );
          }
      }]);
  
      var _CouponForm = CouponForm;
      CouponForm = (0, _reactRouter.withRouter)(CouponForm) || CouponForm;
      return CouponForm;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({
      /*把 props 转为对应的值，可用于把 Redux store 中的值读出*/
      mapPropsToFields: function mapPropsToFields(props) {
          var couponData = props.couponData;
  
          if (couponData) {
              return {
                  couponType: {
                      value: couponData.couponType
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
              props.couponData[key] = fields[key].value;
          });
      }
  })(CouponForm);
  module.exports = exports["default"];
  
  //重置
  
  //提交数据
  
  //优惠券面值列表
  
  //日期选择器校验
  
  //有效期转具体日期
  /*基本信息*/ /*<span className="ant-form-text" id="total" name="total">
           <Icon type="exclamation-circle" style={{'color':'#2bcbcd'}}/> &nbsp;&nbsp;-1表示不限
           </span>*/ /*适用设置*/ /*<div style={{'display':'inline-block'}}>
                              <DatePicker {...getFieldProps('intervalStartDate',
                              {
                              getValueFromEvent: (date, dateString) => dateString
                               }
                              )}
                              disabled={this.props.form.getFieldProps('periodType').value != 'interval'}
                              disabledDate={this.disabledStartDate}
                              onChange={this.onStartChange}
                              value={this.state.startValue}
                              />
                               <span className="ant-form-text">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                               <DatePicker {...getFieldProps('intervalEndDate', {
                              getValueFromEvent: (date, dateString) => dateString
                               })}
                              disabled={this.props.form.getFieldProps('periodType').value != 'interval'}
                              disabledDate={this.disabledEndDate}
                              onChange={this.onEndChange}
                              value={this.state.endValue}
                              />
                               </div>*/ /*<Select style={{ width: 100 }}
                                        disabled={this.props.form.getFieldProps('periodType').value != 'dynamic'}
                                        {...getFieldProps('dynamicBegin')}>
                                        <Option value="0">当天</Option>
                                        <Option value="1">明天</Option>
                                        <Option value="2">后天</Option>
                                        </Select>*/ /*<Select style={{ width: 100 }}
                                                    disabled={this.props.form.getFieldProps('periodType').value != 'dynamic'}
                                                    {...getFieldProps('dynamicEnd')}>
                                                    <Option value="3">3天</Option>
                                                    <Option value="7">7天</Option>
                                                    <Option value="30">30天</Option>
                                                    </Select>*/ /*领券设置*/

});
