define('platform/component/CompanyList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var CompanyList = (function (_Component) {
      _inherits(CompanyList, _Component);
  
      //static propTypes = {
      //    list: PropTypes.object
      //}
  
      function CompanyList(props) {
          _classCallCheck(this, CompanyList);
  
          _get(Object.getPrototypeOf(CompanyList.prototype), "constructor", this).call(this, props);
          this.state = {};
      }
  
      _createClass(CompanyList, [{
          key: "render",
          value: function render() {
              var _this = this;
  
              var columns = [{
                  title: '序号',
                  dataIndex: 'index'
              }, {
                  title: '企业编号',
                  dataIndex: 'uin'
              }, {
                  title: '企业名称',
                  dataIndex: 'name'
              }, {
                  title: '企业类型',
                  dataIndex: 'type',
                  render: function render(text, record) {
  
                      var typeList = [];
  
                      for (var i = 0; i < record.type.length; i++) {
                          var data = record.type[i];
  
                          switch (data) {
                              case 'BRAND':
                                  typeList.push('品牌客户');
                                  break;
                              case 'PLATFORM_MALL':
                                  typeList.push('平台商城');
                                  break;
                              case 'MALL':
                                  typeList.push('商城');
                                  break;
                              default:
                                  typeList.push('-');
                                  break;
                          }
                      }
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          typeList.toString()
                      );
                  }
              }, {
                  title: '注册日期',
                  dataIndex: 'lastModifiedDate',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.date), "yyyy-MM-dd")
                      );
                  }
              }, {
                  title: '商城名称',
                  dataIndex: 'mallName'
              }, {
                  title: '联系人',
                  dataIndex: 'contactName',
                  render: function render(text, record) {
                      return record.contact ? record.contact.name : '-';
                  }
              }, {
                  title: '联系电话',
                  dataIndex: 'contactMobile',
                  render: function render(text, record) {
                      return record.contact ? record.contact.mobile : '-';
                  }
              }, {
                  title: '运营状态',
                  dataIndex: 'status',
                  filters: [{
                      text: '运营中',
                      value: '运'
                  }, {
                      text: '未通过',
                      value: '未'
                  }, {
                      text: '待审核',
                      value: '待'
                  }],
                  onFilter: function onFilter(value, record) {
  
                      var status = '';
  
                      switch (record.status) {
                          case 'AUTHENTICATION':
                              status = '运营中';
                              break;
                          case 'UNAUTHENTICATION':
                              status = '未通过';
                              break;
                          default:
                              status = '待审核';
                              break;
                      }
  
                      return status.indexOf(value) === 0;
                  },
                  render: function render(text, record) {
  
                      var status = '';
  
                      switch (record.status) {
                          case 'AUTHENTICATION':
                              status = _react2["default"].createElement(
                                  "span",
                                  null,
                                  "运营中"
                              );
                              break;
                          case 'INVALIDATED':
                              status = _react2["default"].createElement(
                                  "span",
                                  { style: { 'color': '#FF6161' } },
                                  "未通过"
                              );
                              break;
                          default:
                              status = _react2["default"].createElement(
                                  "span",
                                  { style: { 'color': '#FF6161' } },
                                  "待审核"
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
                  title: "操作",
                  dataIndex: 'operation',
                  render: function render(text, record) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style",
                                  onClick: function () {
                                      return _this.props.showForm(record.id);
                                  } },
                              "企业信息"
                          ),
                          _react2["default"].createElement(
                              _antd.Button,
                              { className: "button-style", disabled: record.status != 'AUTHENTICATION',
                                  onClick: function () {
                                      return _this.props.showModal(record.id);
                                  } },
                              "平台权限"
                          )
                      );
                  }
              }];
  
              //分页
              var pagination = {
                  pageSize: 10,
                  total: this.props.total,
                  showSizeChanger: true,
                  onShowSizeChange: function onShowSizeChange(page, size) {
                      _this.props.list(0, size);
                  },
                  onChange: function onChange(page) {
                      _this.props.list(page - 1);
                  }
              };
  
              var dataList = this.props.data != undefined ? this.props.data : [];
  
              var dataSource = [];
  
              for (var i = 0; i < dataList.length; i++) {
  
                  var scrData = dataList[i];
  
                  //console.log(dataList[i].logistic);
  
                  scrData.key = i;
                  scrData.index = i + 1;
  
                  var data = {
                      index: i + 1,
                      id: dataList[i].id,
                      uin: dataList[i].uin,
                      name: dataList[i].name,
                      type: dataList[i].customerTypes,
                      date: dataList[i].lastModifiedDate,
                      contact: dataList[i].contact,
                      status: dataList[i].status,
                      mallName: dataList[i].mallName ? dataList[i].mallName : '-'
                  };
                  dataSource.push(data);
              }
  
              return _react2["default"].createElement(_antd.Table, { rowKey: function (record) {
                      return record.id;
                  },
                  columns: columns,
                  pagination: pagination,
                  dataSource: dataSource,
                  loading: this.props.loading,
                  bordered: true });
          }
      }]);
  
      return CompanyList;
  })(_react.Component);
  
  exports["default"] = CompanyList;
  module.exports = exports["default"];

});
