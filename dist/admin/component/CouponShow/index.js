define('admin/component/CouponShow/index.jsx', function(require, exports, module) {

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
  
  var CouponShow = (function (_Component) {
      _inherits(CouponShow, _Component);
  
      function CouponShow(props) {
          var _this = this;
  
          _classCallCheck(this, CouponShow);
  
          _get(Object.getPrototypeOf(CouponShow.prototype), "constructor", this).call(this, props);
  
          this.handleSubmit = function (e) {
  
              e.preventDefault();
  
              _this.props.form.validateFields(function (errors, values) {
                  if (!!errors) {
                      //console.log.log('Errors in form!!!');
                      return;
                  } else {
                      //const formData = this.props.form.getFieldsValue();
  
                      var formData = {
                          "perTotal": values.perTotal,
                          "plusAmount": values.plusAmount
                      };
  
                      //console.log(this.props.form.getFieldProps('name').value);
  
                      //console.log(formData, this.props);
                      //console.log(this.props.data);
                      // 验证
                      _this.props.submit(formData, _this.props.data.id);
  
                      //this.props.reset(this.props.data.pageIndex);
                  }
              });
          };
  
          this.render = function () {
              var _props = _this.props;
              var data = _props.data;
              var resData = _props.resData;
  
              if (data == null && resData == null) {
                  return null;
              }
  
              //console.log(data, resData);
  
              var title = '',
                  visible = false,
                  display = undefined,
                  width = undefined,
                  content = undefined,
                  footer = undefined;
  
              var formItemLayout = {
                  labelCol: { span: 4 },
                  wrapperCol: { span: 20 }
              };
  
              var _props$form = _this.props.form;
              var getFieldProps = _props$form.getFieldProps;
              var getFieldError = _props$form.getFieldError;
              var isFieldValidating = _props$form.isFieldValidating;
  
              //表格的columns
              var columns = [{
                  title: '序号',
                  dataIndex: 'index',
                  key: 'index',
                  width: 64
              }, {
                  title: '投放',
                  dataIndex: 'delivery',
                  key: 'delivery',
                  width: 433
              }, {
                  title: '内容类型',
                  dataIndex: 'type',
                  key: 'type',
                  width: 142,
                  render: function render(text, record) {
  
                      var content = undefined;
  
                      switch (record.type) {
                          case 'content':
                              content = '长图文';
                              break;
                          default:
                              content = '-';
                              break;
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          content
                      );
                  }
              }, {
                  title: '已领取',
                  dataIndex: 'reception',
                  key: 'reception',
                  width: 64,
                  sorter: function sorter(a, b) {
                      return a.reception - b.reception;
                  }
              }, {
                  title: '已核销',
                  dataIndex: 'verification',
                  key: 'verification',
                  width: 65,
                  sorter: function sorter(a, b) {
                      return a.verification - b.verification;
                  }
              }, {
                  title: '内容状态',
                  dataIndex: 'status',
                  key: 'status',
                  width: 141
              }];
  
              var dataList = _this.props.resData != undefined ? _this.props.resData : [];
  
              var dataSource = [];
  
              for (var i = 0; i < dataList.length; i++) {
  
                  var scrData = dataList[i];
                  var _status = '',
                      statusText = '';
  
                  //console.log(dataList[i].logistic);
  
                  scrData.key = i;
                  scrData.index = i + 1;
  
                  if (_this.props.contentList != undefined) {
                      for (var j = 0; j < _this.props.contentList.length; j++) {
                          if (_this.props.contentList[j].id = dataList[i].id) {
                              _status = _this.props.contentList[j].contentStatus;
  
                              switch (_status) {
                                  case 'edit':
                                      statusText = '编辑中';
                                      break;
                                  case 'published':
                                      statusText = '已发布';
                                      break;
                                  default:
                                      statusText = '-';
                                      break;
                              }
  
                              break;
                          }
                      }
                  }
  
                  //待调整
                  var _data = {
  
                      pageIndex: dataList[i].pageIndex,
                      index: i + 1,
                      id: dataList[i].id,
                      type: dataList[i].resBindType,
                      reception: dataList[i].recieved,
                      verification: dataList[i].cashed,
                      receptionRate: dataList[i].recieved / dataList[i].total,
                      verificationRate: dataList[i].cashed / dataList[i].total,
                      delivery: dataList[i].resName,
                      status: statusText
  
                  };
  
                  dataSource.push(_data);
              }
  
              //console.log(this.props);
  
              //分页
              /*const pagination = {
                  total: this.props.resTotal,
                  showSizeChanger: true,
                  onShowSizeChange: (page, size)=> {
                      this.props.resList(this.props.id,0, size)
                  },
                  onChange: (page)=> {
                      this.props.resList((this.props.id,page - 1))
                  }
              };*/
  
              switch (_this.props.type) {
                  case 'showAddNumber':
                      title = '设置追加数量';
                      visible = true;
                      display = true;
  
                      if (!data) {
                          return null;
                      }
  
                      footer = _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { type: "primary", onClick: _this.handleSubmit },
                              "确定"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { onClick: function () {
                                      return _this.props.reset(_this.props.data.pageIndex);
                                  } },
                              "取消"
                          )
                      );
  
                      content = _react2["default"].createElement(
                          _antd.Form,
                          { horizontal: true },
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "追加数量：" }),
                              _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('plusAmount'), {
                                  style: { width: 100 },
                                  min: 1,
                                  disabled: data.total == -1,
                                  placeholder: "输入数量" })),
                              _react2["default"].createElement(
                                  "span",
                                  { className: "ant-form-text", id: "plusAmount", name: "plusAmount" },
                                  _react2["default"].createElement(_antd.Icon, { type: "exclamation-circle", style: { 'color': '#2bcdcd' } }),
                                  "  总分发数量：",
                                  _react2["default"].createElement(
                                      "span",
                                      null,
                                      data.total == -1 ? '不限' : data.total
                                  ),
                                  "  剩余数量：",
                                  _react2["default"].createElement(
                                      "span",
                                      null,
                                      data.total == -1 ? '不限' : data.total - data.recieved
                                  )
                              )
                          ),
                          _react2["default"].createElement(
                              FormItem,
                              _extends({}, formItemLayout, {
                                  label: "限领数量：" }),
                              _react2["default"].createElement(_antd.InputNumber, _extends({}, getFieldProps('perTotal', {
                                  initialValue: data.rule.receive.perTotal,
                                  rules: [{
                                      type: 'number',
                                      required: true,
                                      message: '请输入次数'
                                  }] }), {
                                  style: { width: 100 },
                                  min: 1,
                                  max: data.total != -1 ? data.total : Infinity,
                                  placeholder: "输入数量",
                                  autoComplete: "off" })),
                              _react2["default"].createElement(
                                  "span",
                                  { className: "ant-form-text", id: "perTotal", name: "perTotal" },
                                  " 每个用户领券数量，默认为1"
                              )
                          )
                      );
                      break;
                  case 'showCouponInfo':
                      title = '优惠券详情';
                      visible = true;
                      display = false;
  
                      //debug
                      //resData = data;
  
                      if (!resData) {
                          return null;
                      }
  
                      width = 1080;
                      footer = '';
                      content = _react2["default"].createElement(_antd.Table, { columns: columns,
                          style: { 'display': !display ? 'block' : 'none' },
                          rowKey: function (record) {
                              return record.id;
                          },
                          dataSource: dataSource,
                          scroll: { y: 240 },
                          bordered: true });
                      break;
  
              }
  
              return _react2["default"].createElement(
                  "div",
                  null,
                  _react2["default"].createElement(
                      _antd.Modal,
                      { title: title,
                          visible: visible,
                          width: width,
                          footer: footer,
                          onCancel: _this.props.reset },
                      content
                  )
              );
          };
      }
  
      return CouponShow;
  })(_react.Component);
  
  exports["default"] = _antd.Form.create({})(CouponShow);
  module.exports = exports["default"];

});
