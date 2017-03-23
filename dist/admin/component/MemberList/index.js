define('admin/component/MemberList/index.jsx', function(require, exports, module) {

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
  
  var _commonUtilMedia = require("common/util/media");
  
  var _commonUtilMedia2 = _interopRequireDefault(_commonUtilMedia);
  
  var _commonUtilIndex = require("common/util/index");
  
  '';
  
  var MemberList = (function (_Component) {
      _inherits(MemberList, _Component);
  
      function MemberList(props) {
          var _this = this;
  
          _classCallCheck(this, MemberList);
  
          _get(Object.getPrototypeOf(MemberList.prototype), "constructor", this).call(this, props);
  
          this.handleChange = function (pagination) {
              _this.props.list(pagination.current - 1, pagination.pageSize);
          };
      }
  
      _createClass(MemberList, [{
          key: "getColumns",
          value: function getColumns() {
              var _this2 = this;
  
              var columns = [{
                  title: '会员编号',
                  dataIndex: 'cardNo'
              }, {
                  title: '会员头像',
                  dataIndex: 'headImg',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.headImg ? _react2["default"].createElement("img", { src: _commonUtilMedia2["default"].getMediaUrl(record.headImg),
                              style: { 'width': '60px', 'height': '60px' } }) : '-'
                      );
                  }
              }, {
                  title: '注册日期',
                  dataIndex: 'createdDate',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.createdDate), "yyyy-MM-dd")
                      );
                  }
              }, {
                  title: '最后登录时间',
                  dataIndex: 'lastModifiedDate',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          (0, _commonUtilIndex.dateFormat)(new Date(record.lastModifiedDate), "yyyy-MM-dd hh:mm:ss S")
                      );
                  }
              }, {
                  title: '会员姓名',
                  dataIndex: 'name',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.name ? record.name : '-'
                      );
                  }
              }, {
                  title: '性别',
                  dataIndex: 'sex',
                  render: function render(text, record, index) {
  
                      var sex = '-';
  
                      switch (record.sex) {
                          case 'M':
                              sex = '男';
                              break;
                          case 'F':
                              sex = '女';
                              break;
                          default:
                              break;
                      }
                      return sex;
                  }
              }, {
                  title: '出生日期',
                  dataIndex: 'birthday',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.birthday ? (0, _commonUtilIndex.dateFormat)(new Date(parseInt(record.birthday)), "yyyy-MM-dd") : '-'
                      );
                  }
              }, {
                  title: '手机号',
                  dataIndex: 'mobile'
  
              }, {
                  title: '注册地',
                  dataIndex: 'ipAdr',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.ipAdr ? record.ipAdr : '-'
                      );
                  }
              }, {
                  title: '分销状态',
                  dataIndex: 'uinSeller',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.uinSeller ? '已开通' : '未开通'
                      );
                  }
              }, {
                  title: '交易次数 ',
                  dataIndex: 'opdata.tradeData.orders',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata ? record.opdata.tradeData.orders : '-'
                      );
                  }
              }, {
                  title: '消费金额/元',
                  dataIndex: 'opdata.tradeData.salesAmount',
                  render: function render(text, record) {
  
                      return _react2["default"].createElement(
                          "div",
                          null,
                          record.opdata ? (record.opdata.tradeData.salesAmount / 100).toFixed(2) : '-'
                      );
                  }
              }, {
                  title: '操作',
                  dataIndex: 'operation',
                  render: function render(text, record, index) {
                      return _react2["default"].createElement(
                          "div",
                          null,
                          _react2["default"].createElement(
                              _antd.Button,
                              { type: "primary",
                                  onClick: function () {
                                      return _this2.props.showMemberMallOrderList(record.id);
                                  } },
                              "订单明细"
                          )
                      );
                  }
              }];
              return columns;
          }
      }, {
          key: "getPagination",
          value: function getPagination() {
              var _props$data = this.props.data;
              var totalElements = _props$data.totalElements;
              var size = _props$data.size;
  
              return {
                  total: totalElements,
                  pageSize: size,
                  showSizeChanger: true,
                  showTotal: function showTotal(total) {
                      return "共 " + total + " 个会员";
                  }
              };
          }
      }, {
          key: "render",
          value: function render() {
              var _props = this.props;
              var data = _props.data;
              var loading = _props.loading;
  
              if (!data) {
                  return null;
              }
  
              var columns = this.getColumns();
  
              var pagination = this.getPagination();
  
              return _react2["default"].createElement(_antd.Table, {
                  rowKey: "id",
                  loading: loading,
                  columns: columns,
                  dataSource: data.content,
                  pagination: pagination,
                  bordered: true,
                  onChange: this.handleChange });
          }
      }]);
  
      return MemberList;
  })(_react.Component);
  
  exports["default"] = MemberList;
  module.exports = exports["default"];

});
