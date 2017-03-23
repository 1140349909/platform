define('admin/component/CompanyList/index.jsx', function(require, exports, module) {

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
  
  '';
  
  var confirm = _antd.Modal.confirm;
  
  var CompanyList = (function (_Component) {
      _inherits(CompanyList, _Component);
  
      function CompanyList(props) {
          _classCallCheck(this, CompanyList);
  
          _get(Object.getPrototypeOf(CompanyList.prototype), "constructor", this).call(this, props);
      }
  
      // 控制状态按钮
  
      _createClass(CompanyList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var columns = [{
                  title: '序号',
                  dataIndex: 'index',
                  render: function render(text, record, index) {
                      return index + 1;
                  }
              }, {
                  title: '店员名称',
                  dataIndex: 'name'
  
              }, {
                  title: '工号',
                  dataIndex: 'jobNo'
              }, {
                  title: '手机号码',
                  dataIndex: 'mobile'
              }, {
                  title: '所属店铺',
                  dataIndex: 'storeName',
                  render: function render(text, record) {
                      return record.store.name;
                  }
              }, {
                  title: '人数',
                  dataIndex: 'number6',
                  render: function render(text, record) {
                      return '-';
                  }
              }, {
                  title: '人数排名',
                  dataIndex: 'number7',
                  render: function render(text, record) {
                      return '-';
                  }
              }, {
                  title: '消费总金额',
                  dataIndex: 'number8',
                  render: function render(text, record) {
                      return '-';
                  }
              }, {
                  title: '金额排名',
                  dataIndex: 'number9',
                  render: function render(text, record) {
                      return '-';
                  }
              }, {
                  title: '操作',
                  dataIndex: 'number10',
                  colSpan: 2,
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          _antd.Button,
                          { className: "company-list-btn", onClick: function () {
                                  _this.props.showEmployee(Object.assign(record, {
                                      type: 'modify'
                                  }));
                              } },
                          "修改"
                      );
                  }
              }, {
                  title: '操作',
                  dataIndex: 'number11',
                  colSpan: 0,
                  render: function render(text, record) {
                      return _react2["default"].createElement(CompanyListStateBtn, {
                          id: record.id,
                          empStatus: record.empStatus,
                          doEmployeeState: _this.props.doEmployeeState });
                  }
              }];
  
              var data = this.props.data;
  
              var pagination = {
                  pageSize: data.size,
                  total: data.totalElements,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.employeeList(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.employeeList(page - 1);
                  }
              };
  
              return _react2["default"].createElement(_antd.Table, {
                  className: "company-list",
                  rowKey: function (record) {
                      return record.id;
                  },
                  columns: columns,
                  pagination: pagination,
                  dataSource: data.content,
                  bordered: true });
          }
      }]);
  
      return CompanyList;
  })(_react.Component);
  
  exports["default"] = CompanyList;
  
  var CompanyListStateBtn = (function (_Component2) {
      _inherits(CompanyListStateBtn, _Component2);
  
      function CompanyListStateBtn() {
          var _this2 = this;
  
          _classCallCheck(this, CompanyListStateBtn);
  
          _get(Object.getPrototypeOf(CompanyListStateBtn.prototype), "constructor", this).apply(this, arguments);
  
          this.showTrueConfirm = function () {
              confirm({
                  title: '是否启用此员工',
                  content: '是否启用此员工',
                  onOk: function onOk() {
                      _this2.props.doEmployeeState({
                          id: _this2.props.id,
                          status: 'TRUE'
                      });
                  },
                  onCancel: function onCancel() {}
              });
          };
  
          this.showFalseConfirm = function () {
              confirm({
                  title: '是否禁用此员工',
                  content: '是否禁用此员工',
                  onOk: function onOk() {
                      _this2.props.doEmployeeState({
                          id: _this2.props.id,
                          status: 'FALSE'
                      });
                  },
                  onCancel: function onCancel() {}
              });
          };
      }
  
      _createClass(CompanyListStateBtn, [{
          key: "render",
          value: function render() {
              return _react2["default"].createElement(
                  "div",
                  null,
                  this.props.empStatus == 'TRUE' && _react2["default"].createElement(
                      _antd.Button,
                      {
                          className: "company-list-btn",
                          onClick: this.showFalseConfirm },
                      "禁用"
                  ),
                  this.props.empStatus !== 'TRUE' && _react2["default"].createElement(
                      _antd.Button,
                      { className: "company-list-btn",
                          onClick: this.showTrueConfirm },
                      "启用"
                  )
              );
          }
      }]);
  
      return CompanyListStateBtn;
  })(_react.Component);
  
  module.exports = exports["default"];

});
